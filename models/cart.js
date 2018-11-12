const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = require('./product');

const cartSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'product'
    },
    qty: {
        type: Number,
        required: true
    },
    createdAt: Date,
	updatedAt: Date
}, { collation: 'cart', autoIndex: false, timestamps: true });

module.exports.cartSchema = cartSchema;
exports.model = mongoose.model('cart', cartSchema);