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


// router.post('/home', function(req, res) {
//   req.checkBody('post', 'You must enter a post').notEmpty().
//   var postContent = req.body.post;
//   var errors = req.validationErrors();
//   if (errors) {
//     //create notification to tell user that they need to resubmit the form//
//   } else {
//     models.post.build({post: postContent}).then(function(post) {
//       post.save();
//       res.redirect('/home');
//     })
//   }
// });

module.exports = router;
