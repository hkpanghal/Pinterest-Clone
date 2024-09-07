const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Post Schema
const postSchema = new Schema({
  postText: {
    type: String,
    required: true,
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Array,
    default: [],
  },
});

// Create the Post model
const Post = mongoose.model('Post', postSchema);

module.exports = Post;
