const mongoose = require("mongoose");

const queAnsSchema = new mongoose.Schema({

    // courseId is relation with QueAns schema
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    // Insert array of object
    queAns: {
        type: Array,
        required: true,
        default: []
    },
   // Insert array of object other way
    queAnsDup: {
        type: [{
            question : String,
            answer : String
        }],
        required: true,
        default: []
    },
    created_at: {
        type: Date,
        default: new Date(),
        required: true,
    },
    updated_at: {
        type: Date,
        default: new Date(),
        required: true,
    },
});

const QueAns = mongoose.model('QueAns', queAnsSchema);
module.exports = QueAns;
