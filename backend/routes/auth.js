const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get(
  "/login",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get("/logout", (req, res) => {
  // console.log("/logout");
  req.session.destroy((err) => {
    if (err) {
      res.json({ message: "error", error: err });
    } else {
      req.logout();
      res.json({ message: "logged out" });
    }
  });
});
router.get(
  "/callback",
  passport.authenticate("google", {
    successRedirect: process.env.FRONT_END_URL,
    failureRedirect: process.env.FRONT_END_URL,
  })
);

router.get("/user", (req, res) => {
  // console.log("/user");
  if (req.user) {
    if (req.user.email === "benmlubas@gmail.com") {
      res.json({
        success: true,
        message: "user authenticated",
        user: req.user,
        cookies: req.cookies,
      });
    } else if (
      req.user.email.search(
        /@student\.colonialsd\.org|@staff\.colonialsd\.org/
      ) === -1
    ) {
      res.json({
        succes: false,
        message: "non csd email",
      });
    } else {
      res.json({
        success: true,
        message: "user authenticated",
        user: req.user,
        cookies: req.cookies,
      });
    }
  } else {
    res.json({
      success: false,
      message: "no one is signed in",
    });
  }
});

module.exports = router;
