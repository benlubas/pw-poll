const express = require("express");
const router = express.Router();
const Admin = require("./../models/admin.model");
const conn = require("./../db");

router.get("/", async (req, res) => {
  const sql = `SELECT * FROM Admins`;
  try {
    conn.query(sql, (err, result) => {
      if (err) {
        res.status(400).json({ error: err });
      } else {
        res.json(result);
      }
    });
  } catch (err) {
    res.json({ error: err });
  }
});
router.get("/:id", async (req, res) => {
  const sql = `SELECT * FROM Admins WHERE _id='${req.params.id}'`;
  try {
    conn.query(sql, (err, result) => {
      if (err) {
        res.status(400).json({ error: err });
      } else {
        res.json(result);
      }
    });
  } catch (err) {
    res.json({ error: err });
  }
  // try {
  //   const foundAdmin = await Admin.find({ _id: req.params.id });
  //   res.json(foundAdmin);
  // } catch (err) {
  //   res.json({ message: err });
  // }
});

router.post("/", async (req, res) => {
  if (
    req.user &&
    req.user.admin &&
    req.user.class === 9999 &&
    req.isAuthenticated()
  ) {
    const sql = `INSERT INTO Admins (email, class) VALUES ('${req.body.email}', '${req.body.class}')`;
    try {
      conn.query(sql, (err, result) => {
        if (err) {
          console.log(err);
          res.status(400).json({ error: err });
        } else {
          conn.query(
            "SELECT * FROM Admins WHERE _id=LAST_INSERT_ID()",
            (err, newAdmin) => {
              res.json(newAdmin[0]);
            }
          );
        }
      });
    } catch (err) {
      console.log(err);
      res.json({ error: err });
    }
  } else {
    res.json({
      error: "Access Denied",
      message: "You do not have the required access to do that",
    });
  }
});
router.put("/", async (req, res) => {
  console.log("(PUT) admin/");
  if (
    req.user &&
    req.user.admin &&
    req.user.class === 9999 &&
    req.isAuthenticated()
  ) {
    console.log(req.body);
    const sql = `UPDATE Admins SET email='${req.body.email}', class='${req.body.class}' WHERE _id='${req.body._id}'`;
    try {
      conn.query(sql, (err, result) => {
        if (err) {
          res.status(400).json({ error: err });
        } else {
          res.json(result);
        }
      });
    } catch (err) {
      res.json({ error: err });
    }
  } else {
    res.json({
      error: "Access Denied",
      message: "You do not have the required access to do that",
    });
  }
});

router.delete("/:id", (req, res) => {
  if (
    req.user &&
    req.user.admin &&
    req.user.class === 9999 &&
    req.isAuthenticated()
  ) {
    const sql = `DELETE FROM Admins WHERE _id='${req.params.id}'`;
    try {
      conn.query(sql, (err, result) => {
        if (err) {
          res.status(400).json({ error: err });
        } else {
          res.json(result);
        }
      });
    } catch (err) {
      res.json({ error: err });
    }
  } else {
    res.json({
      error: "Access Denied",
      message: "You do not have the required access to do that",
    });
  }
});

module.exports = router;
