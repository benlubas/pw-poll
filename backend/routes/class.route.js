const express = require("express");
const router = express.Router();
const Class = require("./../models/class.model");

router.get("/", async (req, res) => {
  try {
    const foundClass = await Class.find().sort({ pollID: 1, number: 1 });
    res.json(foundClass);
  } catch (err) {
    res.json({ message: err });
  }
});

//? @param gradYear Number
router.post("/", async (req, res) => {
  const cla = new Class({
    gradYear: req.body.gradYear
  });
  try {
    const savedClass = await cla.save();
    res.json(savedClass);
  } catch (err) {
    res.json({ message: err });
  }
});

//! make sure the request is {"polls":"<id>"}
//? @param classId URI Param
//? @param pollID req.body String
router.put("/polls/:classId", async (req, res) => {
  Class.findByIdAndUpdate(
    req.params.classId,
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
router.delete("/:id", async (req, res) => {
  Class.findByIdAndRemove(
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
