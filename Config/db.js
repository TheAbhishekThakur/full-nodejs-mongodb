const mongoose = require('mongoose');
require('dotenv').config();
const dbURL = "mongodb+srv://abhishekThakur:thakur@123@cluster0.easkcz2.mongodb.net/fullNodeJsMongoDB?retryWrites=true&w=majority";
const DB_URL = process.env.DB_URL || dbURL;


// DB connection
const db = mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
   
})
    .then(() => console.log('Connected to MongoDB....'))
    .catch((e) => console.error('Could not connect to MongoDB....',e));

    module.exports = db;