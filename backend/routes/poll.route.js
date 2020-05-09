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
  if (req.user && req.user.admin && req.isAuthenticated()) {
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
  } else {
    res.json({
      error: "Access Denied",
      message: "You do not have the required access to do that",
    });
  }
});

router.put("/:id", async (req, res) => {
  if (req.user && req.user.admin && req.isAuthenticated()) {
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
  } else {
    res.json({
      error: "Access Denied",
      message: "You do not have the required access to do that",
    });
  }
});
router.put("/pushForward/:id/:year", async (req, res) => {
  // console.log(req.user);
  // console.log(req.isAuthenticated());
  if (req.user && req.user.admin && req.isAuthenticated()) {
    Poll.findById(req.params.id, (err, poll) => {
      if (err) {
        console.log(err);
      } else {
        poll.gradYears = [req.params.year];
        Poll.findByIdAndUpdate(
          req.params.id,
          poll,
          { useFindAndModify: false },
          (err, updated) => {
            if (err) {
              console.log(err);
              res.status(500).send(err);
            } else {
              res.json({ message: "Poll Updated" });
            }
          }
        );
      }
    });
  } else {
    res.json({
      error: "Access Denied",
      message: "You do not have the required access to do that",
    });
  }
});
router.put("/clone/:id/:newTitle", (req, res) => {
  if (req.user && req.user.admin && req.isAuthenticated()) {
    try {
      Poll.findOne({ _id: req.params.id }, async (err, poll) => {
        console.log("POLL:");
        console.log(poll);
        if (err) {
          console.log(err);
        } else {
          try {
            let n = {
              ...poll._doc,
              title: req.params.newTitle,
              timeStamp: Date.now(),
            };
            delete n._id;
            delete n.__v;
            let np = new Poll({ ...n });
            let saved = await np.save();
            res.json({ poll: saved });
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
  console.log("--------------");
  console.log(req.user);
  console.log(req.isAuthenticated());

  console.log("--------------");
  if (req.user && req.user.admin && req.isAuthenticated()) {
    console.log("In the if statement");
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
  } else {
    res.json({
      error: "Access Denied",
      message: "You do not have the required access to do that",
    });
  }
});

module.exports = router;
