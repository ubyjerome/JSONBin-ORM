# JSON Bin ORM

A lightweight ORM for interacting with JSON Bin as a database. This library simplifies CRUD operations on JSON Bin, allowing you to treat it like a regular database.

## Features

- Easy setup and configuration
- CRUD operations (Create, Read, Update, Delete)
- Schema validation for data integrity
- Lightweight and fast

## Installation

Install the package using npm:

```bash
npm install jsonbin-orm
```

## Usage

### Setup

Import the library and initialize a bin instance:

```javascript
const { bin } = require("jsonbin-orm");

const myBin = new bin({
    binId: "your-bin-id",
    apiKey: "your-api-key",
    schema: {
        "name": "string",
        "age": "number"
    }
});
```

### Create a New Record

```javascript
const newRecord = await myBin.createNew({
    name: "Alice",
    age: 25
});
console.log(newRecord);
```

### Fetch a Record by ID

```javascript
const record = await myBin.fetchById("record-id");
console.log(record);
```

### Update a Record by ID

```javascript
const updatedRecord = await myBin.updateOneById("record-id", {
    name: "Bob",
    age: 30
});
console.log(updatedRecord);
```

### Delete a Record by ID

```javascript
const result = await myBin.deleteById("record-id");
console.log(result);
```

### Find Records by Query

```javascript
const records = await myBin.find({ name: "Alice" });
console.log(records);
```

### Update Multiple Records by Query

```javascript
const updatedRecords = await myBin.updateMany({ age: 25 }, { age: 26 });
console.log(updatedRecords);
```

## Configuration

- `binId`: The ID of your JSON Bin.
- `apiKey`: Your JSON Bin API key.
- `schema`: An object defining the expected structure of your data.

## License

This project is licensed under the GPL v3 License. See the [LICENSE](./LICENSE) file for details.

## Schema Information

Explore supported schema types and samples in the [schema types](./schema-types.md) file.

## Contributing

Feel free to open issues or submit pull requests to improve the library.

## Links

- [JSON Bin](https://jsonbin.io/)
- [GitHub Repository](https://github.com/ubyjerome/jsonbin-orm)
