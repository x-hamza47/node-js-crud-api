# Products REST API 🛒

A simple REST API I built using just vanilla Node.js (`http` and `fs` modules only, no Express, no shortcuts). Made this to actually understand what's happening under the hood before relying on frameworks to do it for me.

## What it does

- Get all products
- Get one product by ID
- Add a new product
- Update a product
- Delete a product
- Everything gets stored in a local JSON file (`data/products.json`), so no database setup needed, just clone and run

## Heads up

Right now every request reads the JSON file fresh from disk (`fs.readFileSync`), which works fine for small data but isn't great for performance at scale. A common fix would be caching the data in memory after the first read and only writing back to the file when something actually changes. Didn't add that here since this is just a learning project, but it's a good next step if you want to build on it.

## Tech Stack

- Node.js
- Built in `http` module for the server
- Built in `fs` module for reading and writing data

## Project Structure

```
project-folder/
│
├── data/
│   └── products.json
├── server.js
└── README.md
```

## Getting Started

### Before you start

You just need Node.js installed. Check with:

```
node -v
```

### How to run it

1. Clone this repo

```
git clone https://github.com/x-hamza47/node-js-crud-api.git
```

2. Go into the folder

```
cd node-js-crud-api
```

3. Make sure `data/products.json` exists. If it doesn't, just create it with an empty array so the app has something to read:

```
[]
```

4. Run the server

```
node server.js
```

It'll be live at:

```
http://localhost:4000
```

## API Endpoints

### Get all products

```
GET /products
```

Returns a list of all products.

### Get a single product

```
GET /products/:id
```

Returns a single product matching the given ID. Returns a 404 message if the product does not exist.

### Add a new product

```
POST /products
```

Send a JSON body with the product details, for example:

```json
{
  "name": "Wireless Mouse",
  "price": 25.99
}
```

The server automatically assigns an ID to the new product.

### Update a product

```
PUT /products/:id
```

Send a JSON body with the fields you want to update, for example:

```json
{
  "name": "Wireless Mouse Pro",
  "price": 29.99
}
```

Only the fields provided are updated. Returns a 404 message if the product does not exist.

### Delete a product

```
DELETE /products/:id
```

Deletes the product matching the given ID. Returns a 404 message if the product does not exist.

## Why I built this

Honestly just wanted to understand what Express is actually doing behind the scenes before I started using it everywhere. So this covers the basics: routing manually based on method and URL, reading request bodies chunk by chunk, and using a JSON file as a mock database instead of setting up something like MongoDB.

## What I'd add if I keep working on this

- In memory caching so it's not reading the file on every single request
- Actual input validation (right now it just trusts whatever you send it)
- Better error handling for broken JSON
- Pagination or filters for the products list
- Maybe swap the JSON file for a real database eventually

## License

Open source, feel free to use this for learning or as a reference.
