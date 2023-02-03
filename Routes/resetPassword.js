const express = require("express");
let app = express.Router();

const dbUser = require("../models/resetPassword");
const vericationMiddle = require("../models/login");

app.post("/", vericationMiddle.vericationUsers, async(req, res) => {
    // console.log(res.locals.email);
    let rgEmail = res.locals.email;
    let data = await dbUser.resetPass(req.body, rgEmail);
    req.flash("msg", [data.msg, data.status]);
    res.redirect("/dashboard");
});

// vericationMiddle.vericationUsers

module.exports = app;