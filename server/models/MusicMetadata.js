// Module
const mongoose = require("mongoose");
// Mongoose Schema
const MusicMetadataSchema = new mongoose.Schema({
    musicId: { type: mongoose.Types.ObjectId, ref: "music" },
    containstMusic: {  type: Boolean, default: false },
    containsExplicit: { type: Boolean, default: false },
    artist: { type: String },
    publisher: { type: String },
    composer: { type: String },
    releaseTitle: { type: String },
    album: { type: String },
    recordLabel: { type: String },
    releaseDate: { type: String },
    raw: { type: Object }
})
// Mongoose Model
const MusicMetadata = mongoose.model("music-metadata", MusicMetadataSchema);
// Index
MusicMetadata.createIndexes({ musicId: 1 });

module.exports = MusicMetadata;