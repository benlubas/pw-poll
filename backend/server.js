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
app.use("/polls", pollRouter);
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
// const conn = sql.createConnection({
//   host: "localhost:8080",
//   user: "benlubas",
//   password: process.env.SQL_PW
// });
//? this should work, but I can't get the SQL server running locally, so we're
//? gonna wait for Engel to give us access to the real one
// conn.connect(err => {
//   if (err) throw err;
//   else {
//     console.log("Connected to SQL DB");
//   }
// });

app.listen(port, () => {
  console.log("listening at port " + port);
});
