

const mongoose = require('mongoose');
const plm = require("passport-local-mongoose")
mongoose.connect('mongodb://127.0.0.1:27017/Pinterest_Users');

const Schema = mongoose.Schema;

// Define the User Schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },
  ],
  dp: {
    type: String, // Assuming the profile picture is stored as a URL
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fullname: {
    type: String,
    required: true,
  },
});

userSchema.plugin(plm)
// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
