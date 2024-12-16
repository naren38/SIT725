const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const controller = require("./controller/controller");

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "View/templates"));
app.use("/static", express.static(path.join(__dirname, "View/static")));

// Routes
app.use("/", controller);

// Start the server
const PORT = 8900;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
