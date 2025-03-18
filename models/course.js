const mongoose = require("mongoose");

//Schema relationship 
const courseSchema = new mongoose.Schema({

    // UserId is relation with course schema
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    courseName: {
        type: String,
        required: true,
        default: "BCA",
        trim: true
    },
    feeCharge: {
        type: String,
        required: false,
        default: "0"
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

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
