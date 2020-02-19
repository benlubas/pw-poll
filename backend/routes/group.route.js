const express = require("express");
const router = express.Router();
const Group = require("./../models/group.model");

router.get("/", async (req, res) => {
  try {
    const foundGroup = await Group.find().sort({ name: 1 });
    res.json(foundGroup);
  } catch (err) {
    res.json({ message: err });
  }
});

//? @param name String
router.post("/", async (req, res) => {
  const group = new Group({
    name: req.body.name
  });
  try {
    const savedGroup = await group.save();
    res.json(savedGroup);
  } catch (err) {
    res.json({ message: err });
  }
});

//! make sure the request is {"polls": `\"${id}\"`}
//? @param groupID URI Param
//? @param pollID req.body String
router.put("/polls/:id", async (req, res) => {
  Group.findByIdAndUpdate(
    req.params.id,
    { $push: req.body },
    (err, updated) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else res.json(updated);
    }
  );
});

//? @param id URI Param
router.put("/students/:name", async (req, res) => {
  Group.findOne({ name: req.params.name }, (err, c) => {
    if (err) {
      console.error(err);
    } else {
      if (c === null) {
        res.json({
          error: "error: no group with name " + req.params.name
        });
        res.end();
      } else {
        Group.findOneAndUpdate(
          { name: req.params.name },
          { $addToSet: req.body },
          { useFindAndModify: false },
          (err, updated) => {
            if (err) {
              console.log(err);
              res.status(500).json(err);
            } else {
              res.json(updated);
            }
          }
        );
      }
    }
  });
});

//? @param id URI Param
router.delete("/:id", async (req, res) => {
  Group.findByIdAndRemove(
    req.params.id,
    { useFindAndModify: false },
    (err, removed) => {
      if (err) {
        console.log(err);
        res.json({
          message:
            "Server Error: error deleting element with id " + req.params.id
        });
      } else res.json(removed);
    }
  );
});
router.delete("/all/reallyAll", async (req, res) => {
  Group.deleteMany({}, () => {
    console.log("Group has been dropped");
  });
  res.json({ message: "It's all gone" });
});
module.exports = router;
