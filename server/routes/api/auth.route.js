// Modules
const express = require("express");
const router = express.Router(); 
const passport = require("passport");

// Passport Strategy Module
require("../../config/passport")(passport);

// Controller Modules
const { loginUserData, registerUserData, verifyConfirmationCode, handlePassportError } = require("../../controllers/auth.controller");

// Middleware Modules
const { validateRegisterUserData, validateConfirmationCode, validateLoginData } = require("../../middlewares/auth.middleware.");
router.get("/", (req, res) => {
    // req.logout();
    console.log(req.user);
    console.log(req.isAuthenticated());
    res.end();
})

// @desc    Confirm Email
// @route   GET api/user/confirm/:userId/:code
router.route("/confirm/:userId/:code")
    .get(validateConfirmationCode, verifyConfirmationCode);

// @desc    Register User
// @route   POST api/user/local/register
router.route("/local/register")
    .post(validateRegisterUserData, registerUserData);

// @desc    Login User ( Local Strategy )
// @route   POST api/user/local/login
router.route("/local/login")
    .post(validateLoginData(passport), loginUserData);

// @desc    Login User ( Google OAuth Strategy )
// @route   GET api/user/oauth/google
router.route("/oauth/google")
    .get(passport.authenticate("google", { scope: [ "profile", "email" ] }));

// @desc    Google OAuth Callback
// @route   GET api/user/oauth/google/callback
router.route("/oauth/google/callback")
    .get(passport.authenticate("google", { failureRedirect: "/api/user/error", failureFlash: true }), loginUserData);

router.route("/error")
    .get(handlePassportError);
module.exports = router;