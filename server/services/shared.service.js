// Modules
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

// Nodemailer Transporter Setup
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD
    }
})

/**
 * @param { string } password Password to encypt
 * @return Encypted Password
 */
const encryptPassword = async password => {
    const hashSalt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, hashSalt);
}

/**
 * @param { object } payload Object to sign in JWT
 * @param { number } expiryTime Expiry Time
 * @return { Promise } JWT signed token
 */
const generateJWToken = (payload, expiryTime) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, process.env.JWT_CONFIRMATION_SECRET, { expiresIn: expiryTime }, (err, token) => {
            if(err) reject(err);
            else resolve(token);
        });
    })
}

/**
 * @param { object } mail Mail to send
 * @return { Promise } Sending Mail res
 */
const sendEmail = async mail => {
    // Check Transport
    const isTransportVerified = await transporter.verify();
    if(!isTransportVerified)
        throw "Transport Error";
    return transporter.sendMail(mail);
}

module.exports = {
    encryptPassword,
    sendEmail,
    generateJWToken
}