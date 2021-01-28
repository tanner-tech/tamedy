// Modules
const mongoose = require("mongoose");
// Mongoose Schema
const MusicGenreSchema = new mongoose.Schema({
    genre: { type: String, required: true },
    description: { type: String },
    createdAt: { type: Date, default: Date.now() }
})
// Mongoose Model
const MusicGenre = mongoose.model("music-genre", MusicGenreSchema);
// Index
MusicGenre.createIndexes({ genre: 1 });

module.exports = MusicGenre;
