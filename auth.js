const express = require('express');
const parseurl = require('parseurl');
const session = require('express-session');
const expressValidator = require("express-validator");
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const models = require("./models");
const adminRouter = require('./app');
const router = express.Router();

const app = express();

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(express.static('public'));

router.get('/', function(req, res){
  res.redirect('/signup');
})

router.get('/login', function (req, res) {
  res.render('login');
})

router.post('/login', function(req, res){
   var username = req.body.username;
   var password = req.body.password;
   models.user.findOne({
     where: {
     username: username,
     password: password
   }
}).then(function(user) {
    if (user === null) {
      req.session.authenticated = false;
      res.redirect('/signup');
    } else if (user.password === password && user.username === username) {
      req.session.authenticated = true;
      req.session.username = username;
      req.session.password = password;
      req.session.displayname = user.displayname;
      req.session.userId = user.id;
      res.redirect('/home');
    } else {
      req.session.authenticated = false;
      res.redirect('/login');
    }
  })
});

router.get('/signup', function(req, res) {
  res.render('signup');
})

router.post('/signup', function(req, res) {
  req.checkBody('username', 'You must enter a username').notEmpty().
  req.checkBody('password', 'You must enter a password').notEmpty();
  req.checkBody('displayname', 'You must enter a display name').notEmpty();
  var signUpData = {
    username: req.body.username,
    password: req.body.password,
    displayname: req.body.displayname
  }
  var errors = req.validationErrors();
  if (errors) {
//create notification to tell user that they need to resubmit the form//
  } else {
    models.user.create(signUpData).then(function(user) {
      res.redirect('/home');
    })
  }
});

router.get('/home', function (req, res) {
//check to see if user is logged in//
  if (req.session && req.session.authenticated) {
//gather all data related to all posts//
    models.post.findAll({
      include: [{
        model: models.like,
        as: 'likeData',
        include: [{
          model: models.user,
          as: 'userData'
        }]
      },{
        model: models.user,
        as: 'userData'
      }]
    }).then(function(post) {
//sort posts from most recent to oldest//
    function compare(a,b) {
      if (a.id > b.id)
        return -1;
      if (a.id < b.id)
        return 1;
    }
    posts = post.sort(compare);
//check to see if a post has been liked or not to switch between 'like' and 'unlike' buttons//
    for (let i = 0; i < post.length; i++) {
      for (let j = 0; j < Object.keys(posts[i].likeData).length; j++) {
        if (posts[i].likeData[j].userId.toString() == req.session.userId) {
          posts[i].liked = true;
          posts[i].likeId = posts[i].likeData[j].id
        }
      }
    }
//check to see if the post belongs to the active user, to determine if it should have a delete button//
    for (let i = 0; i <post.length; i++) {
      if (post[i].userId.toString() == req.session.userId) {
        post[i].delete = true;
      }
    }
//render home page with the active user's name and all relevant post-related data//
  res.render('home', {displayname: req.session.displayname, posts: post});
  })} else {
//if user is not authenticated, redirect to the login page//
  res.redirect('/login');
  }
});

router.post('/home',  function(req, res) {
//check to see if the user has entered a post//
  if (req.body.post) {
    req.checkBody('post', 'You must enter a post').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
//create notification to tell user that they need to resubmit the form//
    } else {
//insert a new post into the post table//
        const post = models.post.build({
          post: req.body.post,
          userId: req.session.userId,
        });
        post.save();
//redirect to the home page where the new post will appear//
        return res.redirect('/home');
      }
//check to see if the user has liked a post//
  } else if (req.body.likeButton) {
    var id = req.body.likeButton;
//check whether user has liked a post already//
    var checkForLike = models.post.findOne({where:
      {id: req.body.likeButton}
      , include: {
          model: models.like,
          as: 'likeData'
      }}).then( function(likedPost) {
        for (let i = 0; i < likedPost.likeData.length; i++) {
          for (let j = 0; j < likedPost.likeData[i].userId.length; j++) {
            if (likedPost.likeData[i].userId[j] == req.session.userId) {
              req.session.liked = true;
            }
          }
        }
//if the user has already liked the post, allow them to unlike it and delete their like//
        if (req.session.liked === true) {
          var unlike = models.like.destroy({where:
            {postId: id,
             userId: req.session.userId}
            })
            .then(function() {
              req.session.liked = false;
              res.redirect("/home");
            })
//if the user has not liked the post, allow them to like it and insert a new like into the like table//
        } else {
          var newLike = models.like.create({
            userId: req.session.userId,
            postId: id
            })
            .then(function() {
            req.session.liked = true;
            res.redirect("/home");
            })
          }
      })
//check to see if the user has clicked the delete button//
  } else if (req.body.deleteButton) {
//delete a post from the post table//
    var deletePost = models.post.destroy({where:
      {id: req.body.deleteButton,
       userId: req.session.userId}
    })
    .then(function(post) {
//redirect to home page where the post will no longer appear//
    return res.redirect("/home");
    })
  }
});

//create a logout path//
router.post('/logout', function(req, res){
  var logOutButton = req.body.logout;
  req.session.destroy();
  res.redirect('/login');
});

module.exports = router;
