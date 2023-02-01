const express = require("express");
let app = express.Router();

app.get("/", (req, res) => {
    res.render("index", { msg: req.flash("msg") });
});

module.exports = app;