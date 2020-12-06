
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var itemRouter = require('./routers/item');

var app = express();

var PORT = 8080;
var HOST_NAME = 'localhost';
var DATABASE_NAME = 'shoppingList';


mongoose.connect('mongodb://localhost:27017/appraisal_db_test', {useNewUrlParser: true});;

//mongoose.connect('mongodb://' + HOST_NAME + '/' + DATABASE_NAME);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/api', itemRouter);

app.listen(PORT, function () {
  console.log('Listening on port ' + PORT);
});


//https://github.com/fedosejev/restful-api-express-mongoose/blob/master/app.js
