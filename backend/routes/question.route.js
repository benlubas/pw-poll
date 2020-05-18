const express = require("express");
const router = express.Router();
const Question = require("./../models/question.model");

router.get("/", async (req, res) => {
  try {
    const foundQuestions = await Question.find().sort({ pollID: 1, number: 1 });
    for (let i = 0; i < foundQuestions.length; i++) {
      foundQuestions[i].votes = "privilaged";
    }
    res.json(foundQuestions);
  } catch (err) {
    res.json({ message: err });
  }
});
router.get("/votes/:pollID", async (req, res) => {
  // console.log("question/votes/");
  if (req.user && req.user.admin && req.isAuthenticated()) {
    try {
      const foundQuestions = await Question.find({
        pollID: req.params.pollID,
      }).sort({
        number: 1,
      });
      res.json(foundQuestions);
    } catch (err) {
      res.json({ message: err });
    }
  } else {
    res.json({
      error: "Access Denied",
      message: "You do not have the required access to do that",
    });
  }
});
// Get all the questions from one poll;
router.get("/poll/:pollID", async (req, res) => {
  try {
    let foundQuestions = await Question.find({
      pollID: req.params.pollID,
    }).sort({ number: 1 });
    let qs = [];
    foundQuestions.forEach((val) => {
      qs.push({ ...val._doc });
    });
    for (let i = 0; i < qs.length; i++) {
      for (let j = 0; j < qs[i].votes.length; j++) {
        if (qs[i].votes[j].email === req.user.email) {
          qs[i].vote = qs[i].votes[j].vote;
        }
      }
      if (!qs[i].vote) {
        qs[i].vote = null;
      }
      delete qs[i].votes;
    }
    res.json(qs);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/", async (req, res) => {
  if (req.user && req.user.admin && req.isAuthenticated()) {
    const question = new Question({
      number: req.body.number,
      text: req.body.text,
      type: req.body.type,
      pollID: req.body.pollID,
      options: req.body.options || [],
    });
    try {
      const savedQuestion = await question.save();
      res.json(savedQuestion);
    } catch (err) {
      res.json({ message: err });
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
    let q = await Question.findById(req.body._id);
    q.options = req.body.options;
    q.type = req.body.type;
    q.text = req.body.text;
    await q.save();
    res.json({ message: "Updated" });
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
    try {
      let q = await Question.findById(req.params.id);
      q.number = req.body.number;
      await q.save();
      res.json({ message: "Reordered" });
    } catch (e) {
      console.log(e);
    }
  } else {
    res.json({
      error: "Access Denied",
      message: "You do not have the required access to do that",
    });
  }
});

router.put("/addVote/:id", async (req, res) => {
  if (req.user) {
    let q = await Question.findById(req.params.id);
    let changing = false;
    for (let i = 0; i < q.votes.length; i++) {
      if (q.votes[i].email === req.user.email) {
        changing = true;
        q.votes[i].vote = req.body.vote;
        break;
      }
    }
    if (!changing) {
      q.votes.push({ email: req.user.email, vote: req.body.vote });
    }
    q.markModified("votes");
    let response = await q.save();
    res.json({ message: "done", res: response });
  } else {
    res.json({ message: "no user" });
  }
});

router.put("/pushForward/:pollID/:year", (req, res) => {
  if (req.user && req.user.admin && req.isAuthenticated()) {
    Question.find({ pollID: req.params.pollID }, (err, questions) => {
      if (err) {
        console.log(err);
      } else {
        console.log(questions);
        try {
          questions.map((q, index) => {
            if (q.type.substr(0, 2) === "CS") {
              q.options = [req.params.year];
            }
            return q;
          });
          questions.forEach((q) => q.save());
        } catch (err) {
          console.log(err);
          res.json({ message: "It worked" });
        }
      }
    });
  } else {
    res.json({
      error: "Access Denied",
      message: "You do not have the required access to do that",
    });
  }
});
router.put("/clone/:pollID/:newPollID", (req, res) => {
  if (req.user && req.user.admin && req.isAuthenticated()) {
    try {
      Question.find({ pollID: req.params.pollID }, (err, questions) => {
        if (err) {
          console.log(err);
        } else {
          try {
            questions.forEach((q) => {
              let n = { ...q._doc, pollID: req.params.newPollID, votes: [] };
              delete n._id;
              delete n.__v;
              let nq = new Question({ ...n });
              nq.save();
            });
          } catch (err) {
            console.log(err);
          }
        }
      });
    } catch (err) {
      console.log(err);
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
    try {
      Question.find({ pollID: req.params.pollID }, (err, questions) => {
        if (err) {
          console.log(err);
        } else {
          try {
            questions.forEach((q) => {
              q.votes = [];
              q.save();
            });
          } catch (err) {
            console.log(err);
          }
        }
      });
    } catch (err) {
      console.log(err);
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
    Question.findByIdAndRemove(
      req.params.id,
      { useFindAndModify: false },
      (err, removed) => {
        if (err) {
          console.log(err);
          res.json({ message: "Server Error" });
        } else res.json(removed);
      }
    );
  } else {
    res.json({
      error: "Access Denied",
      message: "You do not have the required access to do that",
    });
  }
});

router.delete("/purge/:pollID/", async (req, res) => {
  if (req.user && req.user.admin && req.isAuthenticated()) {
    Question.deleteMany({ pollID: req.params.pollID }, (err, removed) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else res.json({ message: "questions clensed" });
    });
  } else {
    res.json({
      error: "Access Denied",
      message: "You do not have the required access to do that",
    });
  }
});

router.delete("/all/reallyAll/", async (req, res) => {
  // if (req.user && req.user.admin && req.isAuthenticated()) {
  Question.deleteMany({}, (err, removed) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else res.json({ message: "All of the questions are gone" });
  });
  // } else {
  //   res.json({
  //     error: "Access Denied",
  //     message: "You do not have the required access to do that",
  //   });
  // }
});

module.exports = router;
