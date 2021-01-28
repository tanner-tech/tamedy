// Modules
const mongoose = require("mongoose");

// Create Schema
const EmailConfirmationSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, ref: "user" },
    email: { type: String, required: true },
    secretCode: { type: String, required: true },
    createdDate: { type: Date, default: Date.now(), expires: 600 }
})

// Create Model
const EmailConfirmation = mongoose.model("email-confirmation", EmailConfirmationSchema);

// Indexes
EmailConfirmation.createIndexes({ email: 1, userId: 1 });

module.exports = EmailConfirmation;