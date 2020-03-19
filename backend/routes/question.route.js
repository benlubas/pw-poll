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
router.get("/votes", async (req, res) => {
  try {
    const foundQuestions = await Question.find().sort({ pollID: 1, number: 1 });
    res.json(foundQuestions);
  } catch (err) {
    res.json({ message: err });
  }
});
// Get all the questions from one poll;
router.get("/poll/:pollID", async (req, res) => {
  // console.log("/quesion/poll/:pollID");
  try {
    let foundQuestions = await Question.find({
      pollID: req.params.pollID
    }).sort({ number: 1 });
    let qs = [];
    foundQuestions.forEach(val => {
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
  const question = new Question({
    number: req.body.number,
    text: req.body.text,
    type: req.body.type,
    pollID: req.body.pollID,
    options: req.body.options || []
  });
  try {
    const savedQuestion = await question.save();
    res.json(savedQuestion);
  } catch (err) {
    res.json({ message: err });
  }
});

router.put("/:id", async (req, res) => {
  console.log("question/:id");
  // console.log(req.body);
  let q = await Question.findById(req.body._id);
  q.options = req.body.options;
  q.type = req.body.type;
  q.text = req.body.text;
  await q.save();
  res.json({ message: "Updated" });
});

//! this doesn't work, i never finished it lol
router.put("/addVote/:id", async (req, res) => {
  if (req.user) {
    let q = await Question.findById(req.params.id);
    let changing = false;
    for (let i = 0; i < q.votes.length; i++) {
      if (q.votes[i].email === req.user.email) {
        changing = true;
        console.log(q.votes[i].vote);
        console.log(req.body.vote);
        q.votes[i].vote = req.body.vote;
        console.log(q.votes[i].vote);
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

router.delete("/:id", async (req, res) => {
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
});

router.delete("/purge/:pollID/", async (req, res) => {
  Question.deleteMany({ pollID: req.params.pollID }, (err, removed) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else res.json({ message: "questions clensed" });
  });
});

router.delete("/all/reallyAll/", async (req, res) => {
  Question.deleteMany({}, (err, removed) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else res.json({ message: "All of the questions are gone" });
  });
});

module.exports = router;
