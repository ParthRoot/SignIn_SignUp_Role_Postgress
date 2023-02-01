//use express module
const express = require("express");
const app = express();

//user for adding env file
const doteve = require("dotenv");
doteve.config();

const path = require("path");
const bodyParser = require("body-parser");
const cookie = require("cookie-parser");

const home = require("../Routes/home");

const port = process.env.PORT;
app.use(cookie());

// important for pass data from frontend to backnd
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const static_path = path.join(__dirname, "../public");
app.use(express.static(static_path));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));
app.use(express.json());

app.use("/", home);
// app.use("/signUp", signUp);

app.listen(port, () => {
    console.log("Server is Running on " + port);
});