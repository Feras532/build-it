const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

const Post = require("../models/Post");
const cloudinary = require("../config/cloudinary");

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
  // const SU = await Post.find({ Tags: { $in: ['Setups']}}).count();
  // const Q = await Post.find({ Tags: { $in: ['Questions']}}).count();
  // const PR = await Post.find({ Tags: { $in: ['Products']}}).count();
  // const filters = {
  //   SU:SU,
  //   Q:Q,
  //   PR:PR,
  // };
    // Post.find().sort({ CreationDate: -1}).lean()
    // .then((result) =>{
    //   res.render("community", { layout: "main", posts:result, Filters:filters });
    // })
    // .catch((err)=>{
    //   console.log(err);
    // })
});

router.get("/upgrade", (req, res) => {
  res.render("upgrade", { layout: "main" });
});

router.get("/request",authMiddleware.ensureAuth, (req, res) => {
  res.render("request", { layout: "main" });
});

// router.get("/createPost", authMiddleware.ensureAuth, (req, res) => {
//   res.render("createPost", { layout: "main" , userID: req.user._id});
// });

// router.post("/createPost", async (req, res) => {

//   // res.render("createPost", { layout: "main" });
//   const {Tags, Title, Note, Cost, Collection, Path, Body, userID} = req.body;
//   const result = await cloudinary.uploader.upload(Path);
  
//   const post = new Post({Tags:Tags, Title:Title, 
//     Note:Note, Cost:Cost,Collection:Collection ,Image:result.secure_url, 
//     CID:result.public_id, Body:Body, user:userID });

//   post.save()
//   .then((result) =>{
//     res.redirect(`/community/${post._id}`)
//   })
//   .catch((err) =>{
//     console.log(err);
//   })
// });

// router.get("community/:id", (req, res) =>{
//   const postID = req.params.id;
//   Post.find({_id: postID})
//   .then((result) =>{
//     if(res){
//       const user = User.find({ _id : result.user})
//       res.render("post", {layout: 'main', post : result, user : user});
//     }
//       else
//       res.status(404).send('No Post Exists With The Given ID');
//   })
//   .catch((err) =>{
//     console.log(err);
//   })
// })

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
