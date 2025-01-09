const express = require("express");
const bodyParser = require("body-parser");
const { scanVulnerabilities } = require("../Model/vulnerabilityModel");

const router = express.Router();

router.get("/", (req, res) => {
    res.render("index");
});

router.post("/scan", (req, res) => {
    const url = req.body.url;
    const results = scanVulnerabilities(url);
    res.render("scanResults", { url, results });
});

module.exports = router;
