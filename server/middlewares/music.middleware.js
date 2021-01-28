// Validating Music Info (Detail)
const validateMusicDetail = (req, res, next) => {
    const { title, privacy, filepath } = req.body;
    // Check required fields
    if(!title || !filepath)
        return res.status(400).json({ success: false, msg: "Fill the required fields!" });
    // Check the field types
    if(typeof title != "string" || typeof privacy != "boolean" || typeof filepath != "string")
        return res.status(400).json({ success: false, msg: "Invalid input!" });
    next();
}

module.exports = {
    validateMusicDetail,
}