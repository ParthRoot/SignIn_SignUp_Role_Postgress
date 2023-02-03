const express = require("express");
let app = express.Router();

const dbUser = require("../models/login");

app.post("/", async(req, res) => {
    let data = await dbUser.loginData(req.body, req, res);

    if (data.status == 200) {
        res.cookie("token", data.token);
        // console.log(data.status);
        req.flash("msg", [data.msg, data.status, data.role]);
        res.redirect("/dashboard");
    } else {
        // res.cookie("token", data.token);
        // console.log(data.status);
        req.flash("msg", [data.msg, data.status, data.role]);
        res.redirect("/");
    }
});

module.exports = app;