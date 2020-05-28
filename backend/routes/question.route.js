const express = require("express");
const router = express.Router();
const Question = require("./../models/question.model");
const conn = require("./../db");

router.get("/", async (req, res) => {
  const sql = `SELECT * FROM Questions`;
  try {
    conn.query(sql, (err, result) => {
      if (err) {
        res.status(400).json({ error: err });
      } else {
        result = result.map((r) => ({
          ...r,
          options: r.options.split(":::"),
          typeOptions: JSON.parse(r.typeOptions),
        }));
        res.json(result);
      }
    });
  } catch (err) {
    res.json({ error: err });
  }
});
router.get("/votes/:pollID", async (req, res) => {
  if (req.user && req.user.admin && req.isAuthenticated()) {
    const sql = `SELECT * FROM Votes WHERE pollID='${req.params.pollID}'`;
    try {
      conn.query(sql, (err, result) => {
        if (err) {
          res.status(400).json({ error: err });
        } else {
          result = result.map((r) => ({
            ...r,
            response: r.response.split(":::"),
          }));
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
// Get all the questions from one poll;
// with the votes
router.get("/poll/:pollID", async (req, res) => {
  // const sql = `SELECT *, Questions._id qID, Votes._id vID FROM Questions LEFT JOIN Votes ON Votes.questionID = Questions._id WHERE Questions.pollID='${req.params.pollID}'`;
  const sql = `SELECT * FROM Questions WHERE Questions.pollID='${req.params.pollID}'`;
  try {
    conn.query(sql, (err, result) => {
      if (err) {
        res.status(400).json({ error: err });
      } else {
        result = result.map((r) => ({
          ...r,
          options: r.options.split(":::"),
          typeOptions: JSON.parse(r.typeOptions),
          response: r.response ? r.response.split(":::") : "",
        }));
        res.json(result);
      }
    });
  } catch (err) {
    res.json({ error: err });
  }
});

router.post("/", async (req, res) => {
  // console.log("question/");
  if (req.user && req.user.admin && req.isAuthenticated()) {
    // console.log(req.body);
    const sql = `INSERT INTO Questions (text, number, type, typeOptions, options, pollID) VALUES ('${
      req.body.text
    }', '${req.body.number}', '${req.body.type}', '${JSON.stringify(
      req.body.typeOptions
    )}', '${req.body.options.join(":::")}', '${req.body.pollID}')`;
    // console.log("SQL: " + sql);
    try {
      conn.query(sql, (err, result) => {
        if (err) {
          console.log(err);
          res.status(400).json({ error: err });
        } else {
          conn.query(
            "SELECT * FROM Questions WHERE _id=LAST_INSERT_ID()",
            (err, newQ) => {
              if (err) throw err;
              newQ = newQ.map((r) => ({
                ...r,
                options: r.options.split(":::"),
                typeOptions: JSON.parse(r.typeOptions),
              }));
              res.json(newQ);
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
  // console.log("question/:id");
  if (req.user && req.user.admin && req.isAuthenticated()) {
    const sql = `UPDATE Questions SET text='${
      req.body.text
    }', options='${req.body.options.join(":::")}', type='${
      req.body.type
    }', typeOptions='${JSON.stringify(req.body.typeOptions)}' WHERE _id='${
      req.params.id
    }'`;
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
router.put("/order/:id/", async (req, res) => {
  // console.log("/question/order/:id");
  if (req.user && req.user.admin && req.isAuthenticated()) {
    const sql = `UPDATE Questions SET number='${req.body.number}' WHERE _id='${req.params.id}'`;
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

router.put("/addVote/:voteID", async (req, res) => {
  // console.log("/addVote");
  if (req.user) {
    const sql = `INSERT INTO Votes (_id, questionID, pollID, studentEmail, response) VALUES (${
      req.params.voteID === "null" ? null : req.params.voteID
    }, '${req.body.qID}', '${req.body.pollID}', '${
      req.user.email
    }', '${req.body.vote.join(
      ":::"
    )}') ON DUPLICATE KEY UPDATE response='${req.body.vote.join(":::")}'`;
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
    res.json({ message: "no user" });
  }
});

router.put("/pushForward/:pollID/:year", (req, res) => {
  if (req.user && req.user.admin && req.isAuthenticated()) {
    const sql = `UPDATE Questions SET options='${req.params.year}' WHERE pollID='${req.params.pollID}'`;
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
router.put("/clone/:pollID/:newPollID", (req, res) => {
  if (req.user && req.user.admin && req.isAuthenticated()) {
    const sql = `INSERT INTO Questions (text, number, options, type, typeOptions) SELECT text, number, options, type, typeOptions FROM Questions WHERE pollID='${req.params.pollID}'`;
    try {
      conn.query(sql, (err, result) => {
        if (err) {
          console.log(err);
          res.status(400).json({ error: err });
        } else {
          conn.query(
            `UPDATE Questions SET pollID='${req.params.newPollID}' WHERE pollID IS NULL`,
            (err, response2) => {
              if (err) {
                console.log(err);
                res.status(400).json({ error: err });
              } else {
                res.json(response2);
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

router.put("/clearVotes/:pollID", (req, res) => {
  if (req.user && req.user.admin && req.isAuthenticated()) {
    const sql = `DELETE FROM Votes WHERE pollID='${req.params.pollID}'`;
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

router.delete("/:id", async (req, res) => {
  if (req.user && req.user.admin && req.isAuthenticated()) {
    const sql = `DELETE FROM Questions WHERE _id='${req.params.id}'`;
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

router.delete("/purge/:pollID/", async (req, res) => {
  if (req.user && req.user.admin && req.isAuthenticated()) {
    const sql = `DELETE FROM Questions WHERE pollID='${req.params.pollID}'`;
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
