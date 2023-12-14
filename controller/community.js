const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const upload = require('../controller/multer');
const authMiddleware = require("../routes/auth");
const cloudinary = require("../config/cloudinary");
const e = require("connect-flash");

router.use(express.static('public'));

router.get('/', async (req, res)=>{
  const SU = await Post.find({ Tags: { $in: ['Setups']}}).count();
  const Q = await Post.find({ Tags: { $in: ['Questions']}}).count();
  const PR = await Post.find({ Tags: { $in: ['Products']}}).count();
  const filters = {
    SU:SU,
    Q:Q,
    PR:PR,
  };
    Post.find().sort({ CreationDate: -1}).populate('user').lean()
    .then((result) =>{
      res.render("community", { layout: "main", posts:result, Filters:filters });
    })
    .catch((err)=>{
      console.log(err);
    })
});

router.get('/search', async (req, res) =>{
  const searchQuery = req.query.query;
  if(!searchQuery){
    res.redirect("search?query=+")
  }
  else{
    const SU = await Post.find({ Tags: { $in: ['Setups']}}).count();
    const Q = await Post.find({ Tags: { $in: ['Questions']}}).count();
    const PR = await Post.find({ Tags: { $in: ['Products']}}).count();
    const filters = {
      SU:SU,
      Q:Q,
      PR:PR,
    };
    Post.find({
      $or: [
        { Title: { $regex: searchQuery, $options: 'i' } },
        { user: { $in: await User.find({ userName: { $regex: searchQuery, $options: 'i' } }).distinct('_id') } },
        { Note: { $regex: searchQuery, $options: 'i' }},
        { Body: { $regex: searchQuery, $options: 'i' }},
        { Cost: { $regex: searchQuery, $options: 'i' }},
        { Tags: { $in: [new RegExp(searchQuery, 'i')] }}
  
      ],
    })
    .populate('user').lean()
    .then((posts) => {
      res.render("community", { layout: "main", posts:posts,Filters: filters, query:searchQuery});
    })
    .catch((error) => {
      // Handle the error
      console.error(error);
    });
  }
})


// router.get("/createPost", authMiddleware.ensureAuth, (req, res) => {
//   res.render("createPost", { layout: "main" , userID: req.user._id});
// });

router.get("/createPost",  authMiddleware.ensureAuth, (req, res) => {

  res.render("createPost", { layout: "main" , userID: req.user._id });
  // res.render("createPost", { layout: "main" });
});

router.post("/createPost", upload.single('file'), async (req, res) => {
  //0 public id means that the image is default
  console.log('Creating post...');
    try{
      const {Tags, Title, Note, Cost, Collection, Body, user} = req.body;
      const tagsArray = Tags.split(',');
      var result;
      if(req.file){
          result = await cloudinary.uploader.upload(req.file.path);
      }
      else{
        result = {
          secure_url: 'assets/empty.png',
          public_id: '0',
        }
      }
      const post = new Post({Tags:tagsArray, Title:Title, 
        Note:Note, Cost:Cost ,Image:result.secure_url, 
        CID:result.public_id, Body:Body, user:user });
  
      post.save()
      .then((result) =>{
        res.redirect(`/community/${post._id}`);
        
      })
      .catch((err) =>{
        console.log(err);
      })
  
    }
    catch(err){
      console.log(err);
    }
  });
    
  router.get("/:id", async (req, res) => {
    const fallbackUrl = '/community';
    const postID = req.params.id;
  
    await Post.findOne({ _id: postID }).then((result) => {
      if (result) {
      
        result.Views += 1;
        result.save();   
  
        Post.findOne({ _id: postID })
          .populate('user')
          .lean()
          .then((post) => {
            Comment.find({ post: postID })
              .populate('User')
              .lean()
              .then((comments) => {
                res.render("post", { layout: 'main', post: post, comments: comments, referer: fallbackUrl });
              });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        res.status(404).send('No Post Exists With The Given ID');
      }
    });
  });

  // router.get("/:id/createComment", authMiddleware.ensureAuth, (req,res)=>{
    // });
    router.post("/:id/createComment", authMiddleware.ensureAuth, upload.none(), async (req, res) => {
      const userid = req.user._id;
    // const userId = "6562fef5b865d9690deefa57"; // Assuming you have a valid user ID
    const postId = req.params.id;
    const commentContent = req.body.comment; // Access the comment content from the request body
  
    Post.findOne({ _id: postId }).then((result) => {
      if (result) {
        result.Comments +=1;
        result.save();
        Comment.create({
          User: userId,
          Content: commentContent,
          post: postId,
        }).then(() => {
          res.redirect(`/community/${postId}`);
        });
      } else {
        res.status(404).send("What are you doing?");
      }
    });
  });

  // authMiddleware.ensureAuth
  router.post(":id/ratePost", async (req, res) =>{
    console.log('we made it');
  })
  module.exports = router;