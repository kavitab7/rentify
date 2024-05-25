const mongoose = require('mongoose')
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({

    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        unique: true,
        required: true
    },
    phone: {
        type: Number,
        unique: true,
        required: true
    },
    role: {
        type: String,
        default: 'buyer',
        required: true
    }

}, { timestamps: true })

module.exports = mongoose.model("User", userSchema)
