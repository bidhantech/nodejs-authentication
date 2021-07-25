const mongoose = require("mongoose")
const { Schema } = mongoose;
const validator = require("validator")

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    middleName: {
        type: String
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: (email) => {
            return validator.isEmail(email)
        }
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true,
        select: false
    }
}, { timestamps: true })

module.exports = mongoose.model("User", userSchema)