const mongoose = require('mongoose');
require('dotenv').config();
const DB_URL = process.env.DB_URL;


// DB connection
const db = mongoose.connect('mongodb://127.0.0.1:27017/learnNodeMongo', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
   
})
    .then(() => console.log('Connected to MongoDB....'))
    .catch((e) => console.error('Could not connect to MongoDB....',e));

    module.exports = db;