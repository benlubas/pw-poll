const express = require("express");
const router = express.Router();
const Poll = require("./../models/poll.model");

// Get requests for the polls
router.get("/", async (req, res) => {
  try {
    const foundPolls = await Poll.find().sort({ timeStamp: -1 });
    res.json(foundPolls);
  } catch (err) {
    res.json({ message: err });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const foundPolls = await Poll.findById(req.params.id);
    res.json(foundPolls);
  } catch (err) {
    res.json({ message: err });
  }
});
router.get("/stud/:gradYear", async (req, res) => {
  try {
    const foundPolls = await Poll.find({ gradYears: req.params.gradYear });
    res.json(foundPolls);
  } catch (err) {
    res.json({ message: err });
  }
});

// Post Request to Create a poll
router.post("/", async (req, res) => {
  const poll = new Poll({
    ...req.body,
    timeStamp: Date.now(),
  });
  try {
    const savedPoll = await poll.save();
    res.json(savedPoll);
  } catch (err) {
    res.json({ message: err });
  }
});
router.put("/:id", async (req, res) => {
  let newPoll = { ...req.body };
  delete newPoll._id;
  delete newPoll.__v;
  Poll.findByIdAndUpdate(req.params.id, newPoll, (err, updated) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.send(newPoll);
    }
  });
});

router.delete("/:id", async (req, res) => {
  Poll.findByIdAndRemove(
    req.params.id,
    { useFindAndModify: false },
    (err, removed) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        res.send(removed);
      }
    }
  );
});

module.exports = router;
