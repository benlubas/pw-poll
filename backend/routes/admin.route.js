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
  if (req.user && req.user.admin && req.isAuthenticated()) {
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
  } else {
    res.json({
      error: "Access Denied",
      message: "You do not have the required access to do that",
    });
  }
});
router.put("/", async (req, res) => {
  if (req.user && req.user.admin && req.isAuthenticated()) {
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
  } else {
    res.json({
      error: "Access Denied",
      message: "You do not have the required access to do that",
    });
  }
});

router.delete("/:id", (req, res) => {
  if (req.user && req.user.admin && req.isAuthenticated()) {
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
  } else {
    res.json({
      error: "Access Denied",
      message: "You do not have the required access to do that",
    });
  }
});

module.exports = router;
