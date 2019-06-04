// referencing express module to work with
var express = require('express');

var path  = require('path');

var bodyParsar = require('body-parser');

var app = express();

//making an express variable referenced with express router
var router = express.Router();
var port = process.env.PORT || 3000;

//reference public dir
app.use(express.static(path.join(__dirname, 'public')));

var routes = require('./routes/index');
app.use('/', routes);

app.listen(port, ()=> {
  console.log('Express server is running on port 3000')
});

// view engine setup
app.set('view engine', 'ejs');
app.set('views', __dirname+'/views');

module.exports = app;
