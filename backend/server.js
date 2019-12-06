const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const pollRouter = require("./routes/poll.route");
const classRouter = require("./routes/class.route");
const adminRouter = require("./routes/admin.route");
const questionRouter = require("./routes/question.route");

const app = express();
const port = process.env.PORT || 5000;

//Middlewares
app.use(cors());
app.use(express.json());
app.use("/polls", pollRouter);
app.use("/class", classRouter);
app.use("/question", questionRouter);
app.use("/admin", adminRouter);

app.get("/", (req, res) => {
  res.send("home page");
});

mongoose.connect(
  process.env.DB_CONN,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => {
    console.log("connected to db");
  }
);

app.listen(port, () => {
  console.log("listening at port " + port);
});
