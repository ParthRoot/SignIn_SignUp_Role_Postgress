const jwt = require("jsonwebtoken");
const md5 = require("md5");
const db = require("../db/db");
// const e = require('express');

async function loginData(login_data, req, res) {
    let createSql = `SELECT * FROM signin_signup_role_postgress WHERE email = $1 and password = $2`;
    let { email, password } = login_data;

    try {
        if (email == undefined || password == undefined) {
            let data1 = {
                msg: "please enter the login credentials",
                status: false,
            };
            return data1;
        } else {
            let data = await db.query(createSql, [email, md5(password)]);
            if (data.rowCount > 0) {
                let userData = data.rows[0];
                let { id, email, role } = userData;

                let personalData = { id, email, role };

                let token = jwt.sign({ personalData }, process.env.secreat_key, {
                    expiresIn: process.env.token_expire,
                });

                let roleStringSql = `SELECT role FROM role where id=$1`;
                let roleString = await db.query(roleStringSql, [role]);

                let data1 = {
                    token,
                    status: 200,
                    msg: "SignIn Successfully!!",
                    role: roleString.rows[0].role,
                };
                return data1;
            } else {
                let data1 = {
                    msg: "invalid username or password",
                    status: 400,
                    role: "role not defined",
                };
                return data1;
            }
        }
    } catch (err) {
        console.log(err);
        let data1 = {
            msg: "server error",
            status: 500,
            role: "role not defined",
        };
        return data1;
    }
}

//token verication
let vericationUsers = (req, res, next) => {
    try {
        console.log("middlewere");
        const token = req.headers["token"] || req.cookies.token;

        if (!token) {
            res.redirect("/");
            res.status(200).end();
        }

        const decodeToken = jwt.verify(token, process.env.secreat_key);
        const userId = decodeToken.personalData.id;

        if (req.body.userId && req.body.userId !== userId) {
            res.locals.isAuthenticated = false;
        } else {
            res.locals.isAuthenticated = true;
            res.locals.userId = userId;
            res.locals.email = decodeToken.personalData.email;
            next();
        }
    } catch (e) {
        res.locals.isAuthenticated = false;
        console.log("not Verigy token");
        res.status(401).end();
    }
};

module.exports = { loginData, vericationUsers };