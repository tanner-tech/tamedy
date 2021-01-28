// Modules
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require("connect-flash");
const expressSession = require("express-session");
const MongoStore = require("connect-mongo")(expressSession);
require("dotenv").config({ path: "./config/config.env" });
// Custom Modules
const connectDB = require("./config/database");
const passportStartegyConfig = require("./config/passport");
// Connect to Database
connectDB();
// Instantiate Express App
const app = express();
// Middlewares
//  -BodyParser middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//  -Express Session middleware
app.use(expressSession({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    name: "lg",
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: {
        maxAge: 60 * 60 * 1000 * 24,
        // secure: true,
        httpOnly: true
    }
}))
//  -Flash Middleware
app.use(flash());
//  -Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
// Routes
//  -User Authentication Route
app.use("/api/user", require("./routes/api/auth.route"));
app.use("/api/music", require("./routes/api/music.route"));

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server is started on ", PORT));