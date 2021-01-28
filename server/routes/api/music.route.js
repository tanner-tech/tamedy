// Modules
const express = require("express");
// Exress Router
const router = express.Router();
// Middleware Modules
const { validateMusicDetail } = require("../../middlewares/music.middleware");
const { checkAuthentication, checkRequestingUser } = require("../../middlewares/auth.middleware.");
// Multer Upload
const { audioSingleUpload } = require("../../middlewares/file.middleware");
// Controller Modules
const { requestMusicInfo,requestMusicFileUpload } = require("../../controllers/music.controller");
// Router Middlewares
//  -Custome Auth Middlewares
// router.use(checkAuthentication);
// router.use(checkRequestingUser);
// @desc    Request Music Detail
// @route   POST /api/music/request/detail
router.route("/request/details")
    .post(validateMusicDetail, requestMusicInfo);
// @desc    Request Music File
// @route   POST /api/music/request/file
router.route("/request/file")
    .post([ audioSingleUpload.single("audio") ], requestMusicFileUpload);

module.exports = router;