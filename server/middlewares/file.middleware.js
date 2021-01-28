// Modules
const multer =  require("multer");
// Multer Storages
//  -Audio Storage
const audioStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/audio");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})
//  -Music cover image Storage
const musicCoverImageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/image/music-cover");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})
// Upload Filters
//  -Audio file filter
const audioUploadFileFilter = (req, file, cb) => {
    if(file.mimetype == "audio/mpeg" || file.mimetype == "audio/wav" || file.mimetype == "audio/flac")
        cb(null, true);
    else
        cb(null, false);
}
//  -Image file filter
const imageUploadFileFilter = (req, file, cb) => {
    if(file.mimetype == "image/jpeg" || file.mimetype == "image/png")
        cb(null, true);
    else
        cb(null, false);
}
// Uploads
//  -Audio file Upload ( Single )
const audioSingleUpload = multer({
    storage: audioStorage,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB
        fieldNameSize: 100,
        fields: 0,
        files: 1,
        fieldSize: 0,
    },
    fileFilter: audioUploadFileFilter
})
// -Music cover image file Upload ( Single )
const musicCoverImageSingleUpload = multer({
    storage: musicCoverImageStorage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 10MB
        fieldNameSize: 100,
        fields: 0,
        files: 1,
        fieldSize: 0,
    },
    fileFilter: imageUploadFileFilter
})

module.exports = {
    audioSingleUpload,
    musicCoverImageSingleUpload,
}