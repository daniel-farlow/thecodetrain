const pgp = require("pg-promise")({
  query: e => {
    console.log("QUERY:", e.query);
  }
});

const options = {
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.USER,
  password: process.env.PASSWORD
};

const db = pgp(options);

module.exports = db;
