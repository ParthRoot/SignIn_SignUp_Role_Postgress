const express = require("express");
let app = express.Router();
const db = require("../db/db");

app.get("/", async(req, res) => {
    let role_sql = `select * from role;`;

    let roleName = (await db.query(role_sql, [])).rows;

    console.log(roleName);
    console.log("Fetch Api Complete on Get Param");
    res.send(roleName);
});

module.exports = app;