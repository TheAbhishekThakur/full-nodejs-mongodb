const mongoose = require("mongoose");
const validator = require("validator");

// For Pagination
const mongoosePaginate = require('mongoose-paginate-v2');

// Basic Schema
// Schema relationship 
const userSchema = new mongoose.Schema({

    name : {
        type : String,
        required : true,
        trim : true,
        minlength : 1,
        maxlength : 50,
        //Basic validation
        validate(value){
            var regName =  /^[ a-zA-Z]+(([',. -][ a-zA-Z ])?[ a-zA-Z]*)*$/;
            console.log(regName.test(value))
            if (!regName.test(value)) {
                throw new Error('Kindly Provide with valid Name')
            }
        }
    },
    email : {
        type : String,
        required: true,
        unique  : true,
        trim : true,
        lowercase : true,
        validate(value) {
            const emailCheck = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            const emailStatus = emailCheck.test(String(value).toLowerCase());
            if (!emailStatus) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    mobile: {
        type: String,
        required: true,
        unique  : true,
        minlength: 10,
        maxlength: 10,
        trim: true,
    },
    isEmailVerified: {
        required: true,
        type: Boolean,
        default: false
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
    isDeleted: {
        type: Boolean,
        default: false,
        required: true
    },
    // One to One Relationship with course table
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref:'Course'
    },
     // One to Many Relationship with course table
    // courseId: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: false,
    //     ref:'Course'
    // }]

});

userSchema.plugin(mongoosePaginate);

const User = mongoose.model('User',userSchema);
module.exports = User;

