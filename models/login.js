const jwt = require('jsonwebtoken')
const md5 = require('md5')
const db = require('../db/db');
// const e = require('express');

async function loginData(login_data){

   let createSql = `SELECT * FROM signin_signup_role_postgress WHERE email = $1 and password = $2 and role = $3`;
   let {email,password, role} = login_data;


   try{
    if(email == undefined || password == undefined){
        let data1 = {
            msg : "please enter the login credentials",
            status: false,
        };
        return data1;
    }else{
        let data = await db.query(createSql,[email,password,role]);
        console.log(data.rows[0]);
        if(data.rowCount > 0){
            let userData = data.rows[0];
            let {id,email,role} = userData;
           
            let personalData = {id,email};
            console.log(personalData);
 
            let token = jwt.sign({personalData},process.env.secreat_key, {expiresIn: process.env.token_expire});
           
            let data1 = {token, status:true};
            return data1;
        }
        else{
            let data1 = {
                msg: 'invalid username or password',
                status: false
            }
            return data1;
        }
    }
 }

   catch(err){
    console.log(err)
    let data1 = {
        msg: 'something went wrong',
        status: false
    }
    return data1;
   }
}
  

module.exports = {loginData};