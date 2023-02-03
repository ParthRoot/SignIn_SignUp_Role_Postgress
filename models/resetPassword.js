const db = require("../db/db");
const md5 = require("md5");
const jwt = require("jsonwebtoken");

async function resetPass(userData, email) {
    try {
        let createSql = `UPDATE signin_signup_role_postgress SET password = $2 WHERE email = $1`;
        // let { email, password } = userData;

        let compPass = await comparePassword(userData, email);
        // console.log(compPass);

        if (compPass == 0) {
            // let { newPassword } = userData;
            let { password, newPassword, reNewPassword } = userData;
            console.log("first");
            if (email == undefined || password == undefined) {
                let statusData = {
                    msg: "please enter login credentials",
                    status: false,
                };

                return statusData;
            } else if (newPassword != reNewPassword) {
                let statusData = {
                    msg: "new password and reNewPassword not matching",
                    status: false,
                };

                return statusData;
            } else if (password == newPassword) {
                let statusData = {
                    msg: "please set different password!",
                    status: false,
                };

                return statusData;
            } else {
                let updatePass = await db.query(createSql, [email, md5(newPassword)]);

                if (updatePass.rowCount > 0) {
                    let statusData = {
                        msg: "Reset Password Successfully",
                        status: 200,
                    };

                    return statusData;
                } else {
                    let statusData = {
                        msg: "No data found!!",
                        status: 404,
                    };

                    return statusData;
                }
            }
        } else {
            let statusData = {
                msg: "Server Error!!",
                status: 500,
            };

            return statusData;
        }
    } catch (e) {
        console.log(e);
        let statusData = {
            msg: "Server Error!!",
            status: 500,
        };

        return statusData;
    }
}

async function comparePassword(userData, email) {
    let flag = 1;
    let createSql = `SELECT * FROM signin_signup_role_postgress WHERE email = $1 and password = $2`;
    let { password, newPassword, reNewPassword } = userData;
    // console.log(newPassword);
    // console.log(reNewPassword);
    // console.log(password);
    try {
        let data = await db.query(createSql, [email, md5(password)]);

        if (data.rowCount > 0) {
            flag = 0;
            return flag;
        } else {
            return flag;
        }
    } catch (e) {
        console.log(e);
        return flag;
    }
}

module.exports = { resetPass };