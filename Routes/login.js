const express = require("express");
let app = express.Router();

const dbUser = require("../models/login");

app.post("/", async(req, res) => {
    let data = await dbUser.loginData(req.body, req, res);
    req.flash("msg", [data.msg, data.status, data.role]);
    res.redirect("/");
});

module.exports = app;