const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AutoIncrement = require('mongoose-sequence')(mongoose);

const productSchema = new Schema({
    sku: {
        type: Number,
        required: false,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    category: [String],
    description: {
        type: String,
        required: true
    },
    photos: [String],
    createdAt: Date,
	updatedAt: Date
}, { collection: 'products', autoIndex: false, timestamps: true });

productSchema.plugin(AutoIncrement, { inc_field: 'sku' });

exports.model = mongoose.model('product', productSchema);