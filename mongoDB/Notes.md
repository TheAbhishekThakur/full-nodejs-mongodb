# To check existing databases

```
show dbs
```

![alt text](image.png)

# Create new database

```
use db_name
```

# To create a collection inside database

```
db.students.insertOne({ name: "Ram", age: 12 })
```

![alt text](image-1.png)

# To get all the documents from a collection inside database

```
db.students.find()
```

![alt text](image-2.png)

# Update a document

```
db.students.updateOne({ name: "Ram" }, { $set: { idCards: { hasPanCard: false, hasAdhaarCard: true } }})
```

![alt text](image-3.png)

![alt text](image-4.png)

`Note 1: MongoDB supports a maximum of 100 levels of nesting for BSON documents.`

`Note 2: The maximum size for a single BSON document in MongoDB is 16 megabytes (MB).`

# Update many document
```
db.students.updateMany({}, {$set: {hobbies: ['Anime', 'Cooking']}})
```

![alt text](image-5.png)

![alt text](image-6.png)

![alt text](image-7.png)

# Search document from collection

```
db.students.find({ 'idCards.hasPanCard': true })
```
![alt text](image-8.png)

# CRUD Operations

![alt text](image-9.png)

![alt text](image-10.png)

![alt text](<Screenshot 2025-09-20 at 1.01.37 PM.png>)

![alt text](image-11.png)

# To check all the collections

```
show collections
```

# Find vs FindOne

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

# What is a Cursor in MongoDB?

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