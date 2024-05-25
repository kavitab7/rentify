const mongoose = require('mongoose')

const propertySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
    place: {
        type: String,
        required: true,
    },
    area: {
        type: Number,
        required: true,
    },
    rent: {
        type: Number,
        required: true,
    },

    bedrooms: {
        type: Number,
        required: true,
    },
    bathrooms: {
        type: Number,
        required: true,
    },
    photo: {
        data: Buffer,
        contentType: String,
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    likes: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

module.exports = mongoose.model("Property", propertySchema)