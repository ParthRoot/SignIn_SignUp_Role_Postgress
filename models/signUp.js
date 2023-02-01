let md5 = require("md5");
const db = require("../db/db");

async function registerUser(userData) {
    try {
        let createSql = `INSERT INTO signin_signup_role_postgress (email, password, role) VALUES ($1, $2, $3)`;
        let { email, password, role } = userData;

        let dbEmail = `SELECT email FROM signin_signup_role_postgress`;

        //fetch all email from database
        let dbEmailData = await db.query(dbEmail);

        // check user is aleready exist or not
        for (let i = 0; i < dbEmailData.rowCount; i++) {
            if (email === dbEmailData.rows[i].email) {
                let statusData = {
                    msg: "user is already exist!!",
                    status: false,
                };

                return statusData;
            }
        }

        //fire insert query
        let register = await db.query(createSql, [email, md5(password), role]);

        if (register.rowCount > 0) {
            let statusData = {
                msg: "SignUp Successfully!!",
                status: true,
            };

            return statusData;
        } else {
            let statusData = {
                msg: "No data found !!",
                status: false,
            };

            return statusData;
        }
    } catch (e) {
        let statusData = {
            msg: "Something Went Wrong!!",
            status: false,
        };

        return statusData;
    }
}

module.exports = {
    registerUser,
};