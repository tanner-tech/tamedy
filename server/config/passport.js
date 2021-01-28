// Modules
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const bcrypt = require("bcryptjs");

// Service Modules
const { checkUserExists, createUser } = require("../services/user.service");

module.exports = passport => {
    // Passport Sessions
    passport.serializeUser((user, done) => {
        done(null, user._id);
    })
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await checkUserExists({ _id: id });
            delete user.password;
            done(null, user);
        } catch(e) {
            done(e);
        }
    })

    // Passport Strategies
    //  -Local
    passport.use(new LocalStrategy(
        { usernameField: "email" },
        async (email, password, done) => {
            try {
                const user = await checkUserExists({ email });
                // Check If user Exists
                if(!user)
                    return done(null, false, { message: "This email has not been registered!" });
                // Check if accoount registered through Google OAuth2.0
                if(user.hasOwnProperty("googleId"))
                    return done(null, false, { message: "Registered throught Google Account!" });
                // Check Password
                const isValidPassword = await bcrypt.compare(password, user.password);
                if(!isValidPassword) 
                    return done(null, false, { message: "Invalid Password!" });
                // Continue
                delete user.password;
                done(null, user);
            } catch(e) {
                done(e);
            }
        }
    ))

    //  -Google OAuth2.0 Strategy
    passport.use(new GoogleStrategy(
        {
            clientID: process.env.OAUTH_GOOGLE_CLIENT_ID,
            clientSecret: process.env.OAUTH_GOOGLE_CLIENT_SECRET,
            callbackURL: "/api/user/oauth/google/callback"
        },
        async (accessToken, refreshToken, profile, done) => {
            const newUserData = {
                googleId: profile.id,
                email: profile.emails[0].value,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                img: profile.photos[0].value
            }
            try {
                // Search user with Email
                const user = await checkUserExists({ email: newUserData.email });
                if(!user) {
                    const createdUser = await createUser(newUserData);
                    return done(null, createdUser);
                }
                // Check if email registered through local
                if(user && !user.googleId) 
                    return done(null, false, { message: "Email Address is registered locally!" });
                // Continue
                done(null, user);
            } catch(e) {
                done(e);
            }
        }
    ))
}