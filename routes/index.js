const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const passport = require("passport");
const authMiddleware = require("../routes/auth");

router.get("/", (req, res) => {
  res.render("main", {
    layout: "main",
  });
});

router.get("/login", authMiddleware.ensureGuest, (req, res) => {
  const errorMessage = req.flash("error")[0];
  res.render("login", { layout: "login", errorMessage: errorMessage });
});

router.get("/dashboard", authMiddleware.ensureAuth, function (req, res) {
  const userName = req.user.userName;
  const pcConfigs = req.user.pcConfig;
  res.render("dashboard", {
    layout: "main",
    userName: userName,
    pcs: pcConfigs,
  });
});

router.get("/signup", authMiddleware.ensureGuest, (req, res) => {
  res.render("signup", { layout: "main" });
});



router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

router.get("/logintest", (req, res) => {
  res.render("logintest", { layout: "main" });
});

router.get("/CreatePC", authMiddleware.ensureAuth, (req, res) => {
  res.render("createPc", { layout: "main" });
});

router.get("/community", (req, res) => {
  res.render("community", { layout: "main" });
});

router.get("/upgrade", (req, res) => {
  res.render("upgrade", { layout: "main" });
});

router.get("/createPost", (req, res) => {
  res.render("createPost", { layout: "main" });
});

router.post("/generated", (req, res) => {
  res.render("generated", { layout: "main" });
});

module.exports = router;
