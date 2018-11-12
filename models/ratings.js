const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = require('./user').userSchema;
const vendorSchema = require('./vendor').vendorSchema;

const ratingSchema = new Schema({
    user: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    vendor: [{
        type: Schema.Types.ObjectId,
        ref: 'vendor'
    }],
    rating: Number
});

exports.ratingSchema = ratingSchema;
exports.model = mongoose.model('ratings', ratingSchema);