const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const sql = require("mysql");

require("dotenv").config();

const pollRouter = require("./routes/poll.route");
const groupRouter = require("./routes/group.route");
const adminRouter = require("./routes/admin.route");
const questionRouter = require("./routes/question.route");

const app = express();
const port = process.env.PORT || 5000;

//Middlewares
app.use(cors());
app.use(express.json());
app.use("/poll", pollRouter);
app.use("/group", groupRouter);
app.use("/question", questionRouter);
app.use("/admin", adminRouter);

app.get("/", (req, res) => {
  res.send("home page");
});

mongoose.connect(
  process.env.DB_CONN,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => {
    console.log("Connected to MongoDB");
  }
);
const conn = sql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "allTheStudents"
});
conn.connect(err => {
  if (err) throw err;
  else {
    // const sql = "SELECT email FROM students WHERE id='14468'";
    // conn.query(sql, (err, res) => {
    //   if (err) throw err;
    //   else {
    //     console.log(res);
    //   }
    // });
    console.log("Connected to SQL DB");
  }
});

app.listen(port, () => {
  console.log("listening at port " + port);
});
