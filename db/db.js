const Pool = require('pg').Pool;

const pool = new Pool({
    user : process.env.db_user,
    host : process.env.db_host,
    database : "postgress",
    password : process.env.db_pass,
    port : 5432,
});

module.exports = {
    query: async(text,params) => await pool.query(text,params)
};