const express = require("express");
const router = express.Router();
const Poll = require("./../models/poll.model");
const conn = require("./../db");

// Get requests for the polls
router.get("/", async (req, res) => {
  const sql = `SELECT * FROM Polls ORDER BY timeStamp DESC`;
  try {
    conn.query(sql, (err, result) => {
      if (err) {
        res.status(400).json({ error: err });
      } else {
        result = result.map((r) => ({
          ...r,
          gradYears: r.gradYears.split(":::"),
        }));
        res.json(result);
      }
    });
  } catch (err) {
    res.json({ error: err });
  }
});
router.get("/:id", async (req, res) => {
  const sql = `SELECT * FROM Polls WHERE _id='${req.params.id}'`;
  try {
    conn.query(sql, (err, result) => {
      if (err) {
        res.status(400).json({ error: err });
      } else {
        result = result.map((r) => ({
          ...r,
          gradYears: r.gradYears.split(":::"),
        }));
        res.json(result[0]);
      }
    });
  } catch (err) {
    res.json({ error: err });
  }
});
router.get("/stud/:gradYear", async (req, res) => {
  const sql = `SELECT * FROM Polls`;
  try {
    conn.query(sql, (err, result) => {
      if (err) {
        res.status(400).json({ error: err });
      } else {
        // console.log(result);
        result = result
          .map((r) => ({
            ...r,
            gradYears: r.gradYears.split(":::"),
          }))
          .filter((val) => val.gradYears.includes(req.params.gradYear));
        res.json(result);
      }
    });
  } catch (err) {
    res.json({ error: err });
  }
});

// Post Request to Create a poll
router.post("/", async (req, res) => {
  // console.log("poll/");
  if (req.user && req.user.admin && req.isAuthenticated()) {
    const sql = `INSERT INTO Polls (title, description, startDate, endDate, gradYears) VALUES ('${
      req.body.title
    }', '${req.body.description}', '${new Date(
      req.body.startDate
    ).getTime()}', '${new Date(
      req.body.endDate
    ).getTime()}', '${req.body.gradYears.join(":::")}')`;
    try {
      conn.query(sql, (err, result) => {
        if (err) {
          console.log(err);
          res.status(400).json({ error: err });
        } else {
          conn.query(
            "SELECT * FROM Polls WHERE _id=LAST_INSERT_ID()",
            (err, newPoll) => {
              if (err) throw err;
              newPoll = newPoll.map((r) => ({
                ...r,
                gradYears: r.gradYears.split(":::"),
              }));
              res.json(newPoll[0]);
            }
          );
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

router.put("/:id", async (req, res) => {
  console.log(req.body.endDate);
  if (req.user && req.user.admin && req.isAuthenticated()) {
    const sql = `UPDATE Polls SET title='${req.body.title}', description='${
      req.body.description
    }', startDate='${new Date(
      req.body.startDate
    ).getTime()}', endDate='${new Date(
      req.body.endDate
    ).getTime()}', gradYears='${req.body.gradYears.join(":::")}' WHERE _id='${
      req.params.id
    }'`;
    try {
      conn.query(sql, (err, result) => {
        if (err) {
          console.log(err);
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
router.put("/pushForward/:id/:year", async (req, res) => {
  if (req.user && req.user.admin && req.isAuthenticated()) {
    const sql = `UPDATE Polls SET gradYears='${req.params.year}' WHERE _id='${req.params.id}'`;
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
router.put("/clone/:id", (req, res) => {
  if (req.user && req.user.admin && req.isAuthenticated()) {
    const sql = `INSERT INTO Polls (title, description, startDate, endDate, gradYears) SELECT title, description, startDate, endDate, gradYears FROM Polls WHERE _id='${req.params.id}'`;
    try {
      conn.query(sql, (err, result) => {
        if (err) {
          console.log(err);
          res.status(400).json({ error: err });
        } else {
          conn.query(
            `UPDATE Polls SET title='${req.body.cloneName}' WHERE _id=LAST_INSERT_ID()`,
            (err, respones2) => {
              if (err) {
                console.log(err);
                res.status(400).json({ error: err });
              } else {
                conn.query(
                  "SELECT * FROM Polls WHERE _id=LAST_INSERT_ID()",
                  (err, newPoll) => {
                    if (err) throw err;
                    newPoll = newPoll.map((r) => ({
                      ...r,
                      gradYears: r.gradYears.split(":::"),
                    }));
                    res.json(newPoll[0]);
                  }
                );
              }
            }
          );
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

router.delete("/:id", async (req, res) => {
  if (req.user && req.user.admin && req.isAuthenticated()) {
    const sql = `DELETE FROM Polls WHERE _id='${req.params.id}'`;
    try {
      conn.query(sql, (err, result) => {
        if (err) {
          res.status(500).json({ error: err });
        } else {
          conn.query(
            `DELETE FROM Votes WHERE pollID = '${req.params.id}'`,
            (err) => {
              if (err) res.status(500).json({ error: err });
              else {
                conn.query(
                  `DELETE FROM Questions WHERE pollID = '${req.params.id}'`,
                  (err) => {
                    if (err) res.status(500).json({ error: err });
                    else res.json(result);
                  }
                );
              }
            }
          );
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
