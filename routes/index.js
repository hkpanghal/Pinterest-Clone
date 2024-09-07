var express = require('express');
var router = express.Router();

let userModel = require("./users")
let postModel = require("./posts");
const passport = require('passport');
const localStrategy = require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/profile',isLoggedIn ,function(req, res, next) {
  res.send("hello from profile");
});

router.post('/register',  function(req, res, next) {
  const userRegistrationData = new userModel({
    username: req.body.username,
    fullname: req.body.fullname,
    email: req.body.email,
    password: req.body.password,
  })

  userModel.register(userRegistrationData,req.body.password)
  .then(function(){
    passport.authenticate("local")(req,res,function(){
      res.redirect("/profile")
    })
  })
});

router.post('/login',passport.authenticate("local",{
  successRedirect:"/profile",
  failureRedirect:"/"

}) ,function(req, res, next) {
  
});

router.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()) return next();

  res.redirect("/");
}
// router.get('/allUserPosts',async function(req, res, next) {
//   let allUserPosts = await userModel.find({_id:"6552009a63404dfa46d20787"}).populate('posts');
//   res.send(allUserPosts);
// });
// router.get('/createUser',async function(req, res, next) {
//   let createdUser = await userModel.create({
//     username:"Harsh",
//     password:"harsh@123",
//     email:"harsh@gmail.com",
//     fullName:"Harsh Sangwan",
//   })
//   res.send(createdUser)
// });

// router.get('/createPost',async function(req, res, next) {
//   let createdPost = await postModel.create({
//     postText:"hello everyone kaise ho sabhi",
//     user:"6552009a63404dfa46d20787"
//   })

//   let user = await userModel.findOne({_id:"6552009a63404dfa46d20787"});
//   user.posts.push(createdPost._id);
//   await user.save();
//   res.send(createdPost)
// });

module.exports = router;
