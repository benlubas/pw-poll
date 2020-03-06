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
  try {
    const foundQuestions = await Question.find({
      pollID: req.params.pollID
    }).sort({ number: 1 });
    for (let i = 0; i < foundQuestions.length; i++) {
      foundQuestions[i].votes = "No access";
      foundQuestions[i].answer = null;
    }
    res.json(foundQuestions);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/", async (req, res) => {
  const question = new Question({
    number: req.body.number,
    text: req.body.text,
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
router.post("/multi", async (req, res) => {
  const ret = [];
  console.log(req.body.arr);
  for (let i = 0; i < req.body.arr.length; i++) {
    let s = req.body.arr[i];
    console.log(s);
    const question = new Question({
      number: s.number,
      text: s.text,
      pollID: s.pollID,
      options: s.options || []
    });
    try {
      const savedQuestion = await question.save();
      ret.push(savedQuestion);
    } catch (err) {
      res.json({ message: err });
      break;
    }
  }
  res.json({ message: "Done" });
});

router.put("/addVotes", async (req, res) => {
  const ans = req.body;
  let response = [];
  ans.forEach(async (a, index) => {
    let q = await Question.findById(a.key);
    console.log(q);
  });
  res.json({ message: "done", res: response });
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
