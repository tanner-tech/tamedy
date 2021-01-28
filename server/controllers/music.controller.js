// Servie Modules
const { createMusicRequest, parseMetadataFromAudio } = require("../services/music.service");

// Request Music
const requestMusicInfo = async (req, res) => {
    // Music Data to be added ( required )
    const { title, privacy, filepath, description, genre, img } = req.body;
    const musicData = {
        userId: req.user._id,
        title: title,
        privacy: privacy,
        filepath: filepath,
    }
    // Check the optional data
    if(description && typeof description == "string")
        musicData.description = description;
    if(genre && typeof genre == "string")
        musicData.genre = genre
    if(img && typeof img == "string")
        musicData.img = img;
    try {
        // Create music request
        const newMusicRequest = await createMusicRequest(musicData);
        // TODO
        // -Send notification to admin
        // -Add metadata data to database
        // -...
        res.json({ success: true });
    } catch(e) {
        console.error(e);
        return res.status(500).json({ success: false, msg: "There has been issue in the server!" });
    }
}

const requestMusicFileUpload = async (req, res) => {
    try {
        if(req.file == undefined) return res.status(404).json({ success: false, msg: "File is invalid!" })
        const metadata = await parseMetadataFromAudio(req.file);
        res.json({
            success: true,
            file: { filepath: req.file.destination, filename: req.file.filename },
            metadata: metadata.common
        });
    } catch(e) {
        return res.status(500).json({ success: false, msg: "There has been issue in the server!" });
    } 
}

module.exports = {
    requestMusicInfo,
    requestMusicFileUpload
}