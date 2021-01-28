// Service Modules
const { checkUserExists, createUser, checkConfirmationEmailExists, createConfirmationData, deleteConfirmationEmail, updateUser } = require("../services/user.service");
const { generateJWToken, sendEmail, encryptPassword } = require("../services/shared.service");
const { confirmationEmailTemplate } = require("../template/emailTemplate");

// Register User
const registerUserData = async (req, res) => {
    try {
        // Encrypt User Password Data
        const hashPassword = await encryptPassword(req.body.password)
        // Register User Data
        const userData = await createUser({
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: hashPassword
        });
        console.log("hello", userData.email);
        // // Generate Confirmation Code
        // const token = await generateJWToken({ email: userData.email }, 600);
        // // Create Confirmation Data for User
        // const confirmationData = await createConfirmationData({
        //     userId: userData._id,
        //     email: userData.email,
        //     secretCode: token
        // });
        // // Send Confirmation Email
        // await sendEmail({
        //     from: process.env.NODEMAILER_EMAIL,
        //     to: confirmationData.email,
        //     subject: "Tamedy Registration | Email Confirmation",
        //     html: `<a href="http://localhost:5000/api/user/confirm/${confirmationData.userId}/${confirmationData.secretCode}">Confirm</a>`
        // });
        res.json({success: true});
    } catch(e) {
        console.error(e);
        return res.status(500).json({ success: false, msg: "There has been issue in the server" });
    }
}
// Verify Email Confirmation
const verifyConfirmationCode = async (req, res) => {
    try {
        // Check user with the userId
        const user = await checkUserExists({ _id: req.params.userId });
        // Check code of an user
        if(user.confirmationStatus) return res.status({ msg: "Email is already verified!" });
        //   Verify code
        const userConfEmail = await checkConfirmationEmailExists({ email: user.email });
        if(userConfEmail.secretCode === req.params.code) {
            await deleteConfirmationEmail({ userId: user._id });
            await updateUser(user._id, { confirmationStatus: true });
        }
        res.json({ success: true });
    } catch(e) {
        return res.status(500).json({ success: false, msg: "There has been issue in the server" });
    }
}
// Login User
const loginUserData = (req, res) => {
    res.json({ success: true, user: req.user });
}
// Handle Login Error
const handlePassportError = (req, res) => {
    res.status(401).json({ success: false, msg: req.flash("error")[0] });
}

module.exports = {
    registerUserData,
    verifyConfirmationCode,
    loginUserData,
    handlePassportError
}