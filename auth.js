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
  if (req.session && req.session.authenticated) {
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
    function compare(a,b) {
      if (a.id > b.id)
        return -1;
      if (a.id < b.id)
        return 1;
    }
    posts = post.sort(compare);
    res.render('home', {displayname: req.session.displayname, posts: post} )
  })} else {
    res.redirect('/login');
  }
});

router.post('/home', function(req, res) {
  if (req.body.post) {
    req.checkBody('post', 'You must enter a post').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
      //create notification to tell user that they need to resubmit the form//
    } else {
        const post = models.post.build({
          post: req.body.post,
          userId: req.session.userId,
        });
        post.save();
        res.redirect('/home');
      }
  } else if (req.body.likeButton) {
    // for (let i = 0; i < post.length; i++) {
    //   if (like.userId[i] === req.session.userId) {
    //       res.redirect('/home');
    // } else {
      const newLike = models.like.build({
        userId: req.session.userId,
        postId: req.body.likeButton
      })
    newLike.save();
    res.redirect('/home');
    }
  // }
// }
});



router.post('/logout', function(req, res){
  var logOutButton = req.body.logout;
  req.session.destroy();
  res.redirect('/login');
});

module.exports = router;
