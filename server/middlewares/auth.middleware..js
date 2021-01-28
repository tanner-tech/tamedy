// Module
const jwt = require("jsonwebtoken");
// Service Module
const { checkUserExists } = require("../services/user.service");

// Validation Middleware for User Data ( Register )
const validateRegisterUserData = async (req, res, next) => {
    // User sent data
    const { firstName, lastName, email, password } = req.body;
    // Error List
    const credencialValidationErrors = [];
    // Validating credencials
    if(!firstName || !lastName || !email || !password )
        return res.status(400).json({ success: false, msg: "Fill all the fields!" })
    //   -Password Length
    if(password.length < 6)
        credencialValidationErrors.push("Password lenght should be 6 or more characters!");
    //   -Password Lowercase
    if(!/[a-z]/g.test(password))
        credencialValidationErrors.push("Password should contain at least 1 lowercase characters!");
    //   -Password Uppercase
    if(!/[A-Z]/g.test(password))
        credencialValidationErrors.push("Password should contain at least 1 uppercase characters!");
    //   -Password Uppercase
    if(!/[0-9]/g.test(password))
        credencialValidationErrors.push("Password should contain at least 1 number!");
    //   -Email
    if(await checkUserExists({ email })) 
        credencialValidationErrors.push("This email is already registered!");
        
    // Check Error
    if(credencialValidationErrors.length > 0)
        return res.status(400).json({ success: false, msg: credencialValidationErrors });
    
    next();
}
// Validate Email Confirmation
const validateConfirmationCode = (req, res, next) => {
    try {
        const secretCode = req.params.code;
        jwt.verify(secretCode, process.env.JWT_CONFIRMATION_SECRET);
        next();
    } catch(e) {
        return res.status(400).json({ success: false, msg: "Code is invalid" });
    }
}
// Validation Middleware for User Data ( Login )
const validateLoginData = (passport) => (req, res, next) => {
    const { email, password } = req.body;
    // Check User Data Validation
    if(!email || !password)
        return res.status(400).json({ success: false, msg: "Fill all the fields!" });
    
    // Passport Authenticate
    passport.authenticate("local", { failureRedirect: "login", failureFlash: true })(req, res, next);
}
// Check If User is Authenticated
const checkAuthentication = (req, res, next) => {
    if(req.isAuthenticated())
        next();
    else 
        return res.status(401).json({ success: false, msg: "Unauthorized!" });
}
// Check If Requesting User is Authenticated User
const checkRequestingUser = (req, res, next) => {
    const userId = req.query.user_id;
    if(!userId)
        return res.status(400).json({ success: false, msg: "Bad Request!" });
    if(req.user && req.user._id == userId)
        next();
    else
        return res.status(401).json({ success: false, msg: "Unauthorized!" });
}

module.exports = {
    validateRegisterUserData,
    validateConfirmationCode,
    validateLoginData,
    checkAuthentication,
    checkRequestingUser
}