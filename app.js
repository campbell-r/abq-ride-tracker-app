// referencing express module to work with
var express = require('express');
var path = require('path');
var bodyParsar = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var User = require('./models/user');
const users = require('./routes/users')
var bcrypt = require('bcrypt');
const FacebookStrategy = require('passport-facebook').Strategy;
const passport = require('passport')
var routes = require('./routes/index');
const auth = require('./routes/auth');



var app = express();


//making an express variable referenced with express router
var router = express.Router();
var port = process.env.PORT || 3000;

//require mongoose for mongodb
var mongoose = require('mongoose');

//parse incoming request
app.use(bodyParsar.urlencoded({
  extended: true
}));

//initialize cookie-parser to allow access to stored cookies within the browser
app.use(cookieParser());

//db config
var db = require('./config/keys').MongoURI;

//connect to mongo
mongoose.connect(db, {
    newURLParser: true
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(() => console.log(err));

//initialize express-session to allow us to track logged-in users across sessions
app.use(session({
  secret: 'somerandstuffs',
  resave: true,
  saveUninitialized: false,
}));
//initialize passport middleware for use
app.use(passport.initialize());
// passport uses sessions to seamlessly navigate restricted areas via persistent login
app.use(passport.session());

app.use("/", express.static(__dirname + '/public'));



app.listen(port, () => {
  console.log('Express server is running on port 3000')
});



app.use('/', routes);
app.use('/auth', auth);
app.use('/users', users);

// view engine setup
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(function(req, res, next){
  res.locals.currentUser = req.session.userId;
});


//If someone does a facebook login for the first time we want to make a new account
//else let's not make a new account, let's just update their account incase they changed
// their facebook display name

function generateOrFindUser(accessToken, refreshToken, profile, done) {
  if (profile.emails[0].value) {
    User.findOneAndUpdate({
        email: profile.emails[0].value
      }, {
        name: profile.displayName || profile.username,
        email: profile.emails[0].value,
        photo: profile.photos[0].value
      }, {
        upsert: true
      },
      done
    );
  } else {
    var noEmailError = new Error("Your email privacy settings prevent you from signing into Bookworm.");
    done(noEmailError, null);
  }
}
// make a facebook developer account and use the clientID and clientSecret that is unique to you
passport.use(new FacebookStrategy({
    clientID: "2056633171309864",
    clientSecret: "18fa1092c870f012c24970474440fe24",
    callbackURL: "http://localhost:3000/auth/facebook/return",
    profileFields: ['id', 'displayName', 'photos', 'email']
  },
  generateOrFindUser));
//Passport requires you to implement methods called serialize and de-serialize
// These methods tell passport how to get info from a user object and store it
//inside a a session
passport.serializeUser(function(user, done) {
  done(null, user._id);
});
//de-set get the id from the cookie in the user's browser
passport.deserializeUser(function(userId, done) {
  User.findById(userId, done);
});


module.exports = app;
