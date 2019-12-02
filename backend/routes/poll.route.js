const express = require("express");
const router = express.Router();
const Poll = require("./../models/poll.model");

// Get requests for the polls
router.get("/", async (req, res) => {
  try {
    const foundPolls = await Poll.find().sort({ openDate: 1 });
    res.json(foundPolls);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/:pollName", (req, res) => {
  res.send("This should be a poll called " + req.params.pollName);
});

// Post Request to Create a poll
router.post("/", async (req, res) => {
  const poll = new Poll({
    title: req.body.title,
    desc: req.body.desc,
    openDate: req.body.openDate,
    closeDate: req.body.closeDate,
    viewInProgress: req.body.viewInProgress,
    pollType: req.body.pollType,
    typeData: req.body.typeData
  });
  try {
    const savedPoll = await poll.save();
    res.json(savedPoll);
  } catch (err) {
    res.json({ message: err });
  }
});
router.delete("/:id", async (req, res) => {
  Poll.findByIdAndRemove(
    req.params.id,
    { useFindAndModify: false },
    (err, removed) => {
      if (err) {
        console.log(err);
        res.json({ message: "Server Error" });
      } else res.json(removed.body);
    }
  );
});

module.exports = router;
