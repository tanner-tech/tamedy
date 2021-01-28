// Modules
const mm = require("music-metadata");
// Model Modules
const Music = require("../models/Music");
// const MusicGenre = require("../models/MusicGenre");

/**
 * @param { object } musicData Music data to be added
 * @return { Promise }
 */
const createMusicRequest = musicData => {
    return Music.create(musicData);
}
/**
 * @param { object } file File data to extract the metadata
 * @return { Promise }
 */
const parseMetadataFromAudio = file => {
    return mm.parseFile(file.destination + "/" + file.filename);
}

module.exports = {
    createMusicRequest,
    parseMetadataFromAudio
}