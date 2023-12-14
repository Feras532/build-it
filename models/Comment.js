const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    Content: {
        type: String,
        required: true,
    },
    CreationDate: {
        type: Date,
        default: Date.now,
    },
    DateMade: {
        type: String,
        default: function () {
            return this.CreationDate.toLocaleString('en-US');
        },
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true,
    }
})


module.exports = mongoose.model('Comment', CommentSchema);