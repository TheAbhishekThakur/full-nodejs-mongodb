const mongoose = require("mongoose");
const validator = require("validator");

const properValidateSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is invalid")
            }
        }
    },
    name: {
        type: String,
        minLength: 1,
        maxLength: 10,
        required: true,
        trim: true,
        validate(value) {
            if (!validator.isLowercase(value)) {
                throw new Error("name must be in lowercase")
            }
        }
    },
    age: {
        type: String,
        minLength: 1,
        maxLength: 3,
        required: false,
        // validate(value) {
        //     let regexAge = /\s[0-1]{1}[0-9]{0,2}/
        //     if (!regexAge.test(value)) {
        //         throw new Error("Invalid age")
        //     }
        // }
    }
});

const ProperValidate = mongoose.model("ProperValidate", properValidateSchema);
module.exports = ProperValidate;