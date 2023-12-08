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

router.post("/register", async (req, res) => {
  const { userName, email, password, password2 } = req.body; // Include firstName and userName

  let errors = [];

  // Check required fields
  if (!userName || !email || !password || !password2) {
    errors.push({ msg: "Please fill in all fields" });
  }

  // Check passwords match
  if (password !== password2) {
    errors.push({ msg: "Passwords do not match" });
  }

  // Check pass length
  if (password.length < 6) {
    errors.push({ msg: "Password should be at least 6 characters" });
  }

  if (errors.length > 0) {
    res.status(400).json({ errors });
  } else {
    // Validation passed
    User.findOne({ email: email.toLowerCase() }).then((user) => {
      if (user) {
        // User exists
        errors.push({ msg: "Email is already registered" });
        res.status(400).json({ errors });
      } else {
        const newUser = new User({
          userName,
          email,
          password,
        });

        // Hash password
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            // Set password to hashed
            newUser.password = hash;
            // Save user
            newUser
              .save()
              .then((user) => {
                res.redirect("/login"); // or res.status(200).json(user) for API response
              })
              .catch((err) => console.log(err));
          });
        });
      }
    });
  }
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

router.get("/CreatePC", (req, res) => {
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
