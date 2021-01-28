// Modules
const mongoose = require("mongoose");
// Mongoose Schema
const UserSchema = new mongoose.Schema({
    googleId: { type: String },
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String },
    userAuth: { type: String, default: "user", enum: [ "user", "admin" ] },
    confirmationStatus: { type: Boolean, default: false },
    img: { type: String },
    createdDate: { type: Date, default: Date.now() }
})
// Mongoose Model
const User = mongoose.model("user", UserSchema);
// Index
User.createIndexes({ email: 1 });

module.exports = User;