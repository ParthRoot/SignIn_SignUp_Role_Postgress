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

module.exports = { loginData };