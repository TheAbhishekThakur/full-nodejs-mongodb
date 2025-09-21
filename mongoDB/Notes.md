# 1. To check existing databases

```
show dbs
```

![alt text](image.png)

# 2. Create new database

```
use db_name
```

# 3. To create a collection inside database

```
db.students.insertOne({ name: "Ram", age: 12 })
```

![alt text](image-1.png)

# 4. To get all the documents from a collection inside database

```
db.students.find()
```

![alt text](image-2.png)

# 5. Update a document

```
db.students.updateOne({ name: "Ram" }, { $set: { idCards: { hasPanCard: false, hasAdhaarCard: true } }})
```

![alt text](image-3.png)

![alt text](image-4.png)

`Note 1: MongoDB supports a maximum of 100 levels of nesting for BSON documents.`

`Note 2: The maximum size for a single BSON document in MongoDB is 16 megabytes (MB).`

# 6. Update many document
```
db.students.updateMany({}, {$set: {hobbies: ['Anime', 'Cooking']}})
```

![alt text](image-5.png)

![alt text](image-6.png)

![alt text](image-7.png)

# 7. Search document from collection

```
db.students.find({ 'idCards.hasPanCard': true })
```
![alt text](image-8.png)

# 8. CRUD Operations

![alt text](image-9.png)

![alt text](image-10.png)

![alt text](<Screenshot 2025-09-20 at 1.01.37 PM.png>)

![alt text](image-11.png)

# 9. To check all the collections

```
show collections
```

# 10. Find vs FindOne

![alt text](image-12.png)

![alt text](image-13.png)

## find()
- Returns all documents that match the query criteria.
- Output is a cursor (like an iterator), not an array directly.

## findOne()
- Returns the first matching document only (not an array).
- If no document matches, it returns null.

![alt text](image-14.png)

## pre-defined keywords

```
lt -> less than
lte -> less than equal
gte -> greater than equal
```

![alt text](image-15.png)

# 11. What is a Cursor in MongoDB?

- In MongoDB, when you use find(), it doesn’t return all documents immediately.
- Instead, it gives you a cursor — a pointer/iterator to the result set of the query.
- You can then iterate through the cursor to access documents one by one.

## How it works:

1. You run a query:
```
const cursor = db.users.find({ age: 25 });
```
Here, cursor is not an array — it’s an object that points to matching documents.

2. You can loop over it:
```
cursor.forEach(doc => console.log(doc));
```

3. Or convert it into an array:
```
const result = db.users.find({ age: 25 }).toArray();
console.log(result);
```

## Behind the scenes:
- MongoDB doesn’t load all matching documents into memory at once (that could be huge!).
- Instead, the cursor fetches documents in batches (default 101 or 4MB, whichever comes first).
- As you iterate, it fetches the next batch until all documents are retrieved.

## Benefits of using Cursor:
- `Memory efficient` → doesn’t load millions of documents at once.
- `Lazy loading` → fetches only when needed.
- `Control` → you can use cursor methods like:

    - `.limit(n)` → limit number of results
    - `.skip(n)` → skip results
    - `.sort({...})` → sort results

👉 Example:
```
db.users.find({ age: { $gt: 20 } })
  .sort({ name: 1 })
  .limit(5)
  .forEach(doc => console.log(doc));
```

This will get users with age > 20, sorted by name, only first 5, using the cursor.

## ⚡ In short:
A cursor is like a smart pointer that lets you process query results efficiently without loading everything into memory at once.

# 12. Insert Document in Collection

## Insert a Document
```
db.students.insert({name: "Ram", age: 12})
```
![alt text](image-16.png)

```
db.students.insertOne({name: "Ankit", age: 13})
```
![alt text](image-17.png)

## Insert many Document
```
db.students.insertMany([{name: "Vijay", age: 23}, {name: "Nitin", age: 34}])
```
![alt text](image-18.png)


# 13. Update Document

## Update a Document
```
db.students.updateOne({name: "Vijay"}, {$set: {age: 15}})
```
![alt text](image-19.png)

## Update many Document
```
db.students.updateMany({age: 12}, {$set: {age: 13}})
```
![alt text](image-20.png)

## Add new field while updating
![alt text](image-21.png)
![alt text](image-22.png)
![alt text](image-23.png)


# 14. Delete Documents

## Delete a Document
```
db.students.deleteOne({ name: "Nitin" })
```
![alt text](image-25.png)

## Delete many Documents
```
db.students.deleteMany({ age: 13 })
```
![alt text](image-24.png)

![alt text](image-26.png)

# 15. Select Column Query (Projection In MongoDB)
```
db.students.find()
```
It will return all the documents with all columns (fields).
![alt text](image-27.png)

With Projection you can get specific fields.
```
db.students.find({}, {name: 1})
```
![alt text](image-28.png)

```
db.students.find({}, {name: 1, _id: 0})
```
![alt text](image-29.png)

# 16. Is MongoDB really Schemaless?

Yes ✅, MongoDB is schema-less (often called schema-flexible).

- You don’t need to predefine the structure of documents in a collection (like you do in SQL tables).
- Documents within the same collection can have different fields, structures, and data types.

Example:
```
// Document 1
{ "name": "Srishti", "age": 28 }

// Document 2
{ "username": "skumar", "email": "abc@example.com" }
```

## However ⚠️:

- While MongoDB itself doesn’t enforce a schema, you can define one at the application layer using ODMs like Mongoose (for Node.js), or using schema validation rules introduced in MongoDB 3.2+.

- This gives you the flexibility of schema-less design but the option to enforce rules when needed.

# 17. Datatypes in MongoDB

Even though MongoDB is schema-less, you can define a schema when you want consistency. This is usually done in two ways:

## 1. Using MongoDB’s Built-in Schema Validation
```
db.createCollection("example", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "email"],
      properties: {
        name: { bsonType: "string" },
        age: { bsonType: "int" },
        rating: { bsonType: "double" },
        price: { bsonType: "decimal" },
        isActive: { bsonType: "bool" },
        createdAt: { bsonType: "date" },
        lastModified: { bsonType: "timestamp" },
        skills: {
          bsonType: "array",
          items: { bsonType: "string" }
        },
        address: {
          bsonType: "object",
          properties: {
            city: { bsonType: "string" },
            pincode: { bsonType: "int" }
          }
        },
        middleName: { bsonType: ["null", "string"] },
        userId: { bsonType: "objectId" },
        file: { bsonType: "binData" },
        username: { bsonType: "string", pattern: "^Sri" }
      }
    }
  }
})
```

## 2. Using ODM (e.g., Mongoose in Node.js)
```
const mongoose = require("mongoose");

const exampleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number },
  rating: { type: Number },
  price: { type: mongoose.Decimal128 },
  isActive: { type: Boolean },
  createdAt: { type: Date, default: Date.now },
  lastModified: { type: mongoose.Schema.Types.Mixed }, // Timestamp not native
  skills: [String],
  address: {
    city: String,
    pincode: Number
  },
  middleName: { type: String, default: null },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  file: Buffer,
  username: { type: String, match: /^Sri/ }
});

module.exports = mongoose.model("Example", exampleSchema);
```

# 18. How to delete database in MongoDB
```
db.dropDatabase()
```
![alt text](image-30.png)

## Delete a collection

```
db.students.drop()
```

# 19. Ordered option in insert command in MongoDB
```
db.books.insertMany([{ name: "A", price: 1 }, { name: "B", price: 2 }])
```
![alt text](image-31.png)

![alt text](image-32.png)

![alt text](image-33.png)

![alt text](image-34.png)

# 20. Schema Validation in MongoDB

## Create a Collection

```
db.createCollection("nonfiction")
```
![alt text](image-35.png)

## Create a Collection with schema validation
```
db.createCollection("nonfiction", {
    validator: {
        $jsonSchema: {
            required: ['name', 'price'],
            properties: {
                name: {
                    bsonType: 'string',
                    description: 'Must be a string and required'
                },
                price: {
                    bsonType: 'number',
                    description: 'Must be a number and required'
                }
            }
        }
    },
    validationAction: "warn" // by default -> validationAction: "error"
})
```
![alt text](image-36.png)

## Modify your schema validation
```
db.runCommand({
    collMod: 'nonfiction',
    validator: {
        $jsonSchema: {
            required: ['name', 'price', 'author'],
            properties: {
                name: {
                    bsonType: 'string',
                    description: 'Must be a string and required'
                },
                price: {
                    bsonType: 'number',
                    description: 'Must be a number and required'
                },
                author: {
                    bsonType: 'array',
                    description: 'Must be an array and required',
                    items: {
                        bsonType: 'object',
                        required: ['name', 'email'],
                        properties: {
                            name: {
                                bsonType: 'string',
                                description: 'Must be a string and required'
                            },
                            email: {
                                bsonType: 'string',
                                description: 'Must be a string and required'
                            },
                        }
                    }
                }
            }
        }
    },
    validationAction: "error"
})
```

![alt text](image-37.png)

# 21. Write concern in MongoDB

Write concern in MongoDB defines the level of acknowledgment required from the database for write operations. It determines how and when MongoDB confirms that a write operation is successful, impacting data durability and consistency.

## Key Components of Write Concern:

### `w` (Write Acknowledgment):

- `w: 0`: No acknowledgment is requested from MongoDB. The operation returns immediately without waiting for any confirmation. This offers the highest performance but provides no guarantee of durability.

- `w: 1`: Acknowledgment is requested from the primary node only. The operation returns after the primary successfully applies the write. This is the default setting prior to MongoDB 5.0.

- `w: <number>`: Acknowledgment is requested from the primary and a specified number of secondary nodes. For example, w: 2 requires acknowledgment from the primary and one secondary.

- `w: "majority"`: Acknowledgment is requested from a majority of the data-bearing members in the replica set. This provides strong durability guarantees, as the data is replicated to a sufficient number of nodes to withstand a primary failure. This is the default setting in MongoDB 5.0 and later.

### `j` (Journal Acknowledgment):

- `j: true`: Requires MongoDB to write the operation to the on-disk journal before acknowledging the write. This ensures durability even in the event of a server crash.

- `j: false`: Does not require journaling before acknowledgment. The write may be lost if the server crashes before the data is flushed to disk.

### `wtimeout` (Write Timeout):
- Specifies a time limit (in milliseconds) for the write operation to receive the requested acknowledgment. If the acknowledgment is not received within the timeout, the operation will error.

## How to Use Write Concern:
Write concern can be specified at the operation level (e.g., in insertOne, updateMany) or set as a default for a collection or database. For multi-document transactions, write concern is set at the transaction level. 

Example:
```
db.myCollection.insertOne(
  { name: "Alice", age: 30 },
  { writeConcern: { w: "majority", j: true, wtimeout: 5000 } }
);
```

This example requests that the insertOne operation be acknowledged by a majority of the replica set members, committed to the on-disk journal, and that the acknowledgment be received within 5 seconds.

![alt text](image-38.png)

# 22. Atomicity in MongoDB

Atomicity = The A in ACID (Atomicity, Consistency, Isolation, Durability).

It means:
👉 A set of database operations either all succeed or all fail.
No partial updates are visible to other operations.

## Before MongoDB 4.0

- Atomicity was guaranteed only at the document level.
- Any update, insert, or delete to a single document (including embedded/nested fields) is atomic.
- Example: Updating multiple fields inside the same document is atomic.

```
db.users.updateOne(
  { _id: 1 },
  { $set: { name: "Srishti", age: 28, isActive: true } }
);
```
✅ Either all fields are updated, or none.

⚠️ But if you needed to update multiple documents (like two users at once), MongoDB did not guarantee atomicity.

## Since MongoDB 4.0 (Replica Sets) and 4.2 (Sharded Clusters)

- MongoDB introduced multi-document transactions.
- Now you can perform ACID transactions across multiple documents, multiple collections, and even multiple databases.

Example (Node.js with Mongoose/MongoDB driver):

```
const session = await mongoose.startSession();
session.startTransaction();

try {
  await User.updateOne({ _id: 1 }, { $inc: { balance: -100 } }, { session });
  await User.updateOne({ _id: 2 }, { $inc: { balance: 100 } }, { session });

  await session.commitTransaction(); // ✅ both succeed
} catch (err) {
  await session.abortTransaction(); // ❌ both rolled back
} finally {
  session.endSession();
}
```
✅ Ensures full atomicity across multiple docs.

## 🔹 Key Points

- Single-document operations → always atomic.
- Multi-document transactions → available since MongoDB 4.0 (replica sets) and 4.2 (sharded clusters).
- Transactions ensure ACID compliance (like SQL).
- Trade-off → transactions are slower than single-document ops.

## 🔹 Real-World Example
- Banking system (transfer money):
    - Deduct ₹100 from `Account A`
    - Add ₹100 to `Account B`

        → Needs multi-document atomicity (transaction).
- Updating user profile (name, email, address) → fits in single document → already atomic.

# 23. MongoImport in MongoDB ( Import json in MongoDB )

![alt text](image-39.png)

![alt text](image-40.png)

# 24. Comparison operators in MongoDB in Hindi ( $eq, $ne, $lt, $gt, $lte, $gte, $in & $nin )

1. `$eq` → Equal To
```
db.students.find({age: {$eq:5}})
```
![alt text](image-41.png)

2. `$ne` → Not Equal To
```
db.students.find({age: {$ne:5}})
```
![alt text](image-42.png)

3. `$lt` → Less Than
```
db.students.find({age: {$lt:5}})
```
![alt text](image-44.png)

4. `$gt` → Greater Than
```
db.students.find({age: {$gt:5}})
```

5. `$lte` → Less Than or Equal To
```
db.students.find({age: {$lte:5}})
```

6. `$gte` → Greater Than or Equal To
```
db.students.find({age: {$gte:5}})
```
![alt text](image-43.png)

7. `$in` → In Array
```
db.students.find({age: {$in:[5,11,12]}})
```
![alt text](image-45.png)

8. `$nin` → Not In Array
```
db.students.find({age: {$nin:[5,12]}})
```
![alt text](image-46.png)

## Check value inside the array
```
db.students.find({ Hobbies: 'walk' })
```
![alt text](image-47.png)

## Check value inside the object
```
db.students.find({ 'identity.hasAdhaarCard': true })
```
![alt text](image-48.png)