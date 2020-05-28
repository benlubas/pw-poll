const sql = require("mysql");
const conn = sql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "allTheStudents",
});
conn.connect((err) => {
  if (err) console.log(err);
  else {
    console.log("Connected to SQL DB");
  }
});

module.exports = conn;
