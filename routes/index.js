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


router.get("/login",authMiddleware.ensureGuest, (req, res) => {
  const errorMessage = req.flash('error')[0];
  res.render("login", {
    layout: "login",
    errorMessage: errorMessage,
  });
});

router.get('/dashboard', authMiddleware.ensureAuth, function (req, res) {
  const userName = req.user.userName;
  const Email = req.user.email;
  res.render('dashboard', {
    layout: "main"
    , userName: userName 
    , Email: Email });
});


router.get("/CreatePC", (req, res) => {
  res.render("createPc", { layout: "main" });
});


module.exports = router;
