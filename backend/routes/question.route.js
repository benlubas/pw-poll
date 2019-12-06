const express = require("express");
const router = express.Router();
const Question = require("./../models/poll.model");

router.get("/", async (req, res) => {
  try {
    const foundQuestions = await Question.find().sort({ pollID: 1, number: 1 });
    res.json(foundQuestions);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/", async (req, res) => {
  const question = new Question({
    number: req.body.number,
    text: req.body.text,
    desc: req.body.desc,
    pollID: req.body.pollID,
    options: req.body.options,
    required: req.body.required,
    votes: {}
  });
  try {
    const savedQuestion = await question.save();
    res.json(savedQuestion);
  } catch (err) {
    res.json({ message: err });
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

module.exports = router;
