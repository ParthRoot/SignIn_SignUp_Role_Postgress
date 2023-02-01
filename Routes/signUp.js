const express = require("express");
let app = express.Router();

const dbUser = require("../models/signUp");

app.post("/", async(req, res) => {
    let data = await dbUser.registerUser(req.body);
    req.flash("msg", [data.msg, data.status]);
    res.redirect("/");
});

module.exports = app;