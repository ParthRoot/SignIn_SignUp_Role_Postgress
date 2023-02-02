const express = require('express');
let app = express.Router();

const dbUser = require('../models/login');

app.post('/',async(req,res) => {
    let data = await dbUser.loginData(req.body);
    console.log(data)
    res.send('login')
})

module.exports= app;