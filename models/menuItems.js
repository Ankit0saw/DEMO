const mongoose = require('mongoose');

const menuItemsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    taste: {
        type: String,
        enum: ['sweet', 'sour', 'spicy', 'salty'],
        required: true
    },
    is_drink: {
        type: Boolean,
        default: false
    },
    ingredients: {
        type: [String],
        default:[]
    },
    num_sales: {
        type: Number,
        default: 0
    },
    is_available: {
        type: Boolean,
        default: true
    }
});

const menuItem= mongoose.model('MenuItem', menuItemsSchema);
module.exports = menuItem;