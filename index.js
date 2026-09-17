const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {

    // Fetch Data
    if (req.method === "GET" && req.url === "/products") {
        const data = fs.readFileSync('./data/products.json', 'utf-8');

        res.writeHead(200, {
            "Content-Type": "application/json"
        });
        res.end(data);

        return;
    }

    // Fetch Data by ID
    if (req.method === "GET" && req.url.startsWith("/products/")) {
        const id = parseInt(req.url.split("/")[2]);

        const data = fs.readFileSync('./data/products.json', 'utf-8');
        const products = JSON.parse(data);
        const product = products.find(product => product.id === id);

        if (!product) {
            res.writeHead(404, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify({
                message: "Product not found"
            }));
            return;
        }
        res.writeHead(200, {
            "Content-Type": "application/json"
        });
        res.end(JSON.stringify(product));
    }

    // Insert Data
    if (req.method === "POST" && req.url === "/products") {
        let body = "";

        req.on("data", (chunk) => {
            body += chunk;
        });

        req.on("end", () => {
            const product = JSON.parse(body);
            const data = fs.readFileSync('./data/products.json', 'utf-8');

            const products = JSON.parse(data);

            product.id = products.length + 1;
            products.push(product);

            fs.writeFileSync('./data/products.json', JSON.stringify(products, null, 2));
            res.writeHead(201, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify(product));
        });

        return;
    }
    // Update Data
    if (req.method === "PUT" && req.url.startsWith("/products/")) {
        const id = parseInt(req.url.split("/")[2]);

        let body = "";

        req.on("data", (chunk) => {
            body += chunk;
        });

        req.on("end", () => {
            const updateData = JSON.parse(body);
            const data = fs.readFileSync('./data/products.json', 'utf-8');

            const products = JSON.parse(data);

            const product = products.find(product => product.id === id);

            if (!product) {
                res.writeHead(404, {
                    "Content-Type": "application/json"
                });
                res.end(JSON.stringify({
                    message: "Product not found"
                }));

                return;
            }

            product.name = updateData.name || product.name;
            product.price = updateData.price || product.price;


            fs.writeFileSync('./data/products.json', JSON.stringify(products, null, 2));
            res.writeHead(201, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify(product));
        });

        return;
    }

    // Delete Data
    if (req.method === "DELETE" && req.url.startsWith("/products/")) {
        const id = parseInt(req.url.split("/")[2]);

        const data = fs.readFileSync('./data/products.json', 'utf-8');
        const products = JSON.parse(data);

        const filteredProducts = products.filter(product => product.id !== id);

        if (filteredProducts.length === products.length) {

            res.writeHead(404, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify({
                message: "Product not found"
            }));

            return;
        }

        fs.writeFileSync('./data/products.json', JSON.stringify(filteredProducts, null, 2));

        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            message: "Product deleted successfully"
        }));

        return;
    }

    res.writeHead(404, {
        "Content-Type": "application/json"
    });

    res.end(JSON.stringify({
        message: "Route not found"
    }));
});

server.listen(4000, () => {
    console.log("Server running on port 4000");
});

