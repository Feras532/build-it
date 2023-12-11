const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    Tags: {
        type:[String],
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
    CID: {
      type: String, //Cloudinary ID
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
      type: [Object],
    },
    Rating: {

      users: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
      },
      value:{
        type:Number,
        default: 0,
      }

    },
    Views: {
      type:Number,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required:true,
    }

    //a way to trace back the user who own the post
  })

  const Post = mongoose.model("Post", PostSchema);