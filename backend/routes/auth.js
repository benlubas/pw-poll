const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get(
  "/",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000",
    failureRedirect: "/failed"
  })
);
router.get("/failed", (req, res) => {
  console.log("/failed");
  res.json({
    success: false,
    message: "failed to authenticate"
  });
});

router.get("/login", (req, res) => {
  console.log("/login");
  console.log("user: ", req.user);
  if (req.user) {
    if (
      req.user.email.search(
        /@student\.colonialsd\.org|@staff\.colonialsd\.org/
      ) === -1
    ) {
      res.json({
        succes: false,
        message: "non csd email"
      });
    } else {
      res.json({
        success: true,
        message: "user authenticated",
        user: req.user,
        cookies: req.cookies
      });
    }
  } else {
    res.json({
      success: false,
      message: "failed user authentication"
    });
  }
});

module.exports = router;
