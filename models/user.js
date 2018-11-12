const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const addressSchema = require('./address_schema');

const userSchema = new Schema({
	// id: {type: Number, index: true},
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
    cart: [{
        type: Schema.Types.ObjectId,
        ref: 'cart'
    }],
	bday: String,
    contact: String,
    address: [addressSchema],
	dp: {type: String, default:"blank_user.png"},
	createdAt: Date,
	updatedAt: Date,
    active: {type: Number, default: 0},
    activationKey: String
}, { collection: 'users', autoIndex: false, timestamps: true });

userSchema.index({ email: 1 });

userSchema.virtual('cartCount').get(function() {
    return this.cart.length;
});

exports.userSchema = userSchema;
exports.model = mongoose.model('user', userSchema);