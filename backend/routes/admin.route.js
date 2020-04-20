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
  const admin = new Admin({
    email: req.body.email,
    class: req.body.class,
  });
  try {
    await admin.save();
    res.json(admin);
  } catch (err) {
    res.json({ message: err });
  }
});
router.put("/", async (req, res) => {
  console.log("HI");
  Admin.findByIdAndUpdate(
    req.body._id,
    {
      email: req.body.email,
      class: req.body.class,
    },
    { useFindAndModify: false },
    (err, resp) => {
      if (err) console.log(err);
      else {
        res.json(resp);
      }
    }
  );
});

router.delete("/:id", (req, res) => {
  console.log("delete /admin");
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
