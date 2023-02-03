const express = require("express");
let app = express.Router();

app.get("/", (req, res) => {
    // res.send("DashBoard");
    res.render("dashboard", { msg: req.flash("msg") });
});

module.exports = app;