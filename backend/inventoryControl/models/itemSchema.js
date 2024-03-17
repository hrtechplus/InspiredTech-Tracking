const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    itemID: {
        type: String,
        required: true,
        unique: true, // Ensures uniqueness of Item ID
    },
    itemName: {
        type: String,
        required: true
    },
    itemBrand: {
        type: String,
        required: true
    },
    itemPrice: {
        type: Number,
        required: true
    },
    stockCount: {
        type: Number,
        required: true
    },
    itemDescription: {
        type: String,
        required: true
    },
    catagory: {
        type: String,
        required: true
    },
    warranty: {
        type: Number
    }
}, {timestamps: true})

const Items = mongoose.model('Items', itemSchema);

module.exports = Items;