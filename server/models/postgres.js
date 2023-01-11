require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.PG_URI,
});

module.exports = {
  query: (text, params, callback) => {
    console.log("Executed Query:", text);
    return pool.query(text, params, callback);
  },
};
