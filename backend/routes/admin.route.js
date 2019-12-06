const express = require("express");
const router = express.Router();
const Admin = require("./../models/admin.model");

router.get("/", async (req, res) => {
  try {
    const foundAdmin = await Admin.find();
    res.json(foundAdmin);
  } catch (err) {
    res.json({ message: err });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const foundAdmin = await Admin.find({ _id: req.params.id });
    res.json(foundAdmin);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/", async (req, res) => {
  console.log("req");
  const admin = new Admin({
    email: req.body.email,
    level: req.body.level,
    class: req.body.class
  });
  try {
    const savedAdmin = await admin.save();
    res.json(savedAdmin);
  } catch (err) {
    res.json({ message: err });
  }
});

router.delete("/:id", async (req, res) => {
  Admin.findByIdAndRemove(
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
