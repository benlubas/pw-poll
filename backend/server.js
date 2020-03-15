const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const sql = require("mysql");
const passport = require("passport");
const oAuthStrategy = require("passport-google-oauth20");

require("dotenv").config();

const pollRouter = require("./routes/poll.route");
const groupRouter = require("./routes/group.route");
const adminRouter = require("./routes/admin.route");
const questionRouter = require("./routes/question.route");
const authRouter = require("./routes/auth");

const app = express();
const port = process.env.PORT || 5000;

//Middlewares
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());
app.use(
  session({ secret: "jake-likes-pie", resave: false, saveUninitialized: false })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/poll", pollRouter);
app.use("/group", groupRouter);
app.use("/question", questionRouter);
app.use("/admin", adminRouter);

let noUser = null;
passport.serializeUser((user, done) => {
  // console.log("Serialize");
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  // console.log("deserialize");
  if (noUser) {
    done(null, noUser);
  } else {
    try {
      conn.query(
        `SELECT * FROM students WHERE id='${id}' LIMIT 1`,
        (err, rows) => {
          if (err) {
            console.log(err);
            done(err);
          } else {
            done(null, rows[0]);
          }
        }
      );
    } catch (err) {
      console.log("Failed to deserialize a user");
      done(e);
    }
  }
});
passport.use(
  new oAuthStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/callback"
    },
    (accessTkn, refreshTkn, profile, done) => {
      console.log(profile._json);
      conn.query(
        "SELECT * FROM students s WHERE s.email='" + profile._json.email + "'",
        (err, rows) => {
          if (err) {
            console.log(err);
          } else {
            if (rows.length > 0) {
              done(null, { ...rows[0] });
            } else {
              noUser = { id: 1234567890, email: profile._json.email };
              done(null, noUser);
            }
          }
        }
      );
    }
  )
);
app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.send("localhost:5000/");
});

try {
  mongoose.connect(
    process.env.DB_CONN,
    { useUnifiedTopology: true, useNewUrlParser: true },
    err => {
      if (!err) {
        console.log("Connected to MongoDB");
      } else {
        console.log("Error");
        console.log(err);
      }
    }
  );
} catch (err) {
  console.log("error");
  console.log(err);
}
mongoose.connection.on("error", err => {
  console.log(err);
});
const conn = sql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "allTheStudents"
});
conn.connect(err => {
  if (err) console.log(err);
  else {
    console.log("Connected to SQL DB");
  }
});

app.listen(port, () => {
  console.log("listening at port " + port);
});
