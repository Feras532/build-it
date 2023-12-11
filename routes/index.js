const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

const Post = require("../models/Post");

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

router.get("/community", async (req, res) => {
      res.render("community", { layout: "main" });

  // const SU = await Post.countDocuments({ Tags: { $in: ['Setups']}});
  // const Q = await Post.countDocuments({ Tags: { $in: ['Questions']}});
  // const PR = await Post.countDocuments({ Tags: { $in: ['Products']}});
  // const filters = {
  //   SU:SU,
  //   Q:Q,
  //   PR:PR,
  // };
  // Post.find()
  //   .then((result) =>{
  //     res.render("community", { layout: "main", posts:result, Filters:filters });
  //   })
  //   .catch((err)=>{
  //     console.log(err);
  //   })
});

router.get("/upgrade", (req, res) => {
  res.render("upgrade", { layout: "main" });
});

router.get("/createPost", (req, res) => {
  res.render("createPost", { layout: "main" });
});

router.post("/createPost", (req, res) => {

  // res.render("createPost", { layout: "main" });
  // const post = new Post(req.body);
  // post.save()
  //   .then((result) =>{
  //     res.redirect('/community')
  //   })
  //   .catch((err) =>{
  //     console.log(err);
  //   })
});

router.post("/generated", (req, res) => {
  res.render("generated", { layout: "main" });
});

router.post("/generated/upgrade", (req, res) => {
  res.render("generatedUpgrade", { layout: "main" });
});

router.get("/generated/upgrade", (req, res) => {
  res.render("upgrade", { layout: "main" });
});
module.exports = router;
