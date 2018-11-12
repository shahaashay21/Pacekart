const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vendorSchema = new Schema({
    fname: {
        type: String, 
        required: [true, "First name is required"]
    },
	lname: {
        type: String,
        required: [true, "Last name is required"]
    },
	email: {
        type: String,
        required: [true, "Email address is required"],
        unique: true,
        index: true
    },
	pass: {
        type: String,
        required: [true, "Password is required"]
    },
    store: {
        type: String,
        required: [true, "Store name is required"]
    },
    url: {
        type: String,
        required: [true, "Please create a url"]
    },
    products: {
        type: Schema.Types.ObjectId,
        ref: 'product'
    }

}, { collection: 'vendors', autoIndex: false, timestamps: true });

exports.vendorSchema = vendorSchema;
exports.model = mongoose.model('vendor', vendorSchema);