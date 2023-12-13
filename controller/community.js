const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Post = require("../models/Post");
const authMiddleware = require("../routes/auth");

router.get('/', async (req, res)=>{
      // res.render("community", { layout: "main" });
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

// router.get("/createPost", authMiddleware.ensureAuth, (req, res) => {
//   res.render("createPost", { layout: "main" , userID: req.user._id});
// });

router.get("/createPost", (req, res) => {
    res.render("createPost", { layout: "main" , userID: "6562fef5b865d9690deefa57"});
  });
// router.get("/createPost", authMiddleware.ensureAuth, (req, res) => {
//   res.render("createPost", { layout: "main" , userID: req.user._id});
// });

router.post("/createPost", upload.single('file'), async (req, res) => {
    //0 public id means that the image is default
      try{
        const {Tags, Title, Note, Cost, Collection, Body, user} = req.body;
        const tagsArray = Tags.split(',');
        var result;
        if(req.file){
            result = await cloudinary.uploader.upload(req.file.path);
        }
        else{
          result = {
            secure_url: 'assets/default.png',
            public_id: '0',
          }
        }
        const post = new Post({Tags:tagsArray, Title:Title, 
          Note:Note, Cost:Cost ,Image:result.secure_url, 
          CID:result.public_id, Body:Body, user:user });
    
        post.save()
        .then((result) =>{
          res.redirect("/");
          // res.redirect("localhost:3000/community");
          // res.redirect(`/community/${post._id}`)
        })
        .catch((err) =>{
          console.log(err);
        })
    
      }
      catch(err){
        console.log(err);
      }
    });
    
    router.get("/:id", (req, res) =>{
      const postID = req.params.id;
      Post.find({_id: postID}).populate('user').lean()
      .then((result) =>{
        if(result){
          res.render("post", {layout: 'main', post : result});
        }
          else
          res.status(404).send('No Post Exists With The Given ID');
      })
      .catch((err) =>{
        console.log(err);
      })
    })
    //comment
    router.post("/:id", (req , res) =>{

    })
    //rate or edit?
    router.put('/:id', (req, res) =>{
    });