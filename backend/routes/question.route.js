const express = require("express");
const router = express.Router();
const Question = require("./../models/question.model");

router.get("/", async (req, res) => {
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
      pollID: req.body.pollID
    }).sort({ number: 1 });
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

module.exports = router;
