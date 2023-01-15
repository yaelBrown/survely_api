const { createPool } = require("mysql2")

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE
}

const db = createPool(config)

db.getConnection((err) => {
  if (err) {
    // console.log(config)
    console.error("error connecting to database: " + err);
  } else {
    process.env.NODE_ENV === "development"
    ? console.log("Connected to Database: \n" + JSON.stringify(config))
    : console.log("Connected to Database");
  }
});

module.exports = db