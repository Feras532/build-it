const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    Tags: {
        type:Array,
        required:true, //?
    },
    Title: {
      type:String,
      required:true,
    },
    Note:{
      type:String,
      default: "",
    },
    Cost:{
      type: String,
    },
    Collection:{
      type:Object,
    },
    Image: {
      type: String,
      default:  "assets/default.png",
    },
    Products: {
      type:Array,
    },
    Body:{
      type:String,
      // required: true //?
    },
    CreationDate:{
      type:Date,
      default:Date.now,
    },
    formattedDate: {
      type: String,
      default: function() {
        return this.CreationDate.toLocaleString('en-US');
      },
    },
    Comments: {
      type: Array,
    },
    Rating: {
      type:Number,
      default: 0,
    },
    Views: {
      type:Number,
      default: 0,
    },
    userName: {
      type:String,
      required:true,
    }
    //a way to trace back the user who own the post
  })

  const Post = mongoose.model("Post", PostSchema);