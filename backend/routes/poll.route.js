const express = require("express");
const router = express.Router();
const Poll = require("./../models/poll.model");

// Get requests for the polls
router.get("/", async (req, res) => {
  try {
    const foundPolls = await Poll.find();
    res.json(foundPolls);
  } catch (err) {
    res.json({ message: err });
  }
});
router.get("/:pollName", (req, res) => {
  res.send("This should be a poll called " + req.params.pollName);
});

// Post Request to Create a poll
router.post("/create", async (req, res) => {
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
router.delete("/delete/:id", (req, res) => {
  Poll.findByIdAndRemove(req.params.id, { select: "title" }, removed => {
    res.json(removed);
  });
});

module.exports = router;
