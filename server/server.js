// Modules
const express = require("express");

// Instantiate Express App
const app = express();



// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server is started on ", PORT));