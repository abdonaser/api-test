const mongoose = require('mongoose')
const validator = require('validator')
const userSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: [validator.isEmail, 'Must Be A Valid Email Address']
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: true
        }
    }
)

const usersModel = mongoose.model("users", userSchema)

module.exports = usersModel 