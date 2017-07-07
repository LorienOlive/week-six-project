const express = require('express');
const parseurl = require('parseurl');
const session = require('express-session');
const expressValidator = require("express-validator");
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const models = require("./models");
const adminRouter = require('./admin');
const auth = require('./auth')

const app = express();

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');


app.use(session({
  secret: 'no touch monkey',
  resave: false,
  saveUninitialized: true,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(express.static('public'));
app.use(auth);



// app.get('/signup', function(req, res) {
//   res.render('signup');
// })

app.listen(3000, function(){
  console.log("Successfully started express application!")
});
