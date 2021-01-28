// Modules
const mongoose = require("mongoose");
// Mongoose Schema
const MusicSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, ref: "user", required: true },
    filepath: { type: String, required: true },
    title: { type: String, required: true },
    privacy: { type: Boolean, default: false },
    approval: { type: Boolean, default: false },
    description: { type: String },
    genre: { type: mongoose.Types.ObjectId, ref: "music-genre" },
    img: { type: String },
    updateDate: { type: Date },
    requestDate: { type: Date, default: Date.now() },
    approveDate: { type: Date }
})
// Mongoose Model
const Music = mongoose.model("music", MusicSchema);
// Index
Music.createIndexes({ userId: 1, genre: 1 });

module.exports = Music;