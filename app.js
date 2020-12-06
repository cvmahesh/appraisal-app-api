var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose= require('mongoose');

// Bring in CORS  https://medium.com/zero-equals-false/using-cors-in-express-cac7e29b005b
var cors = require('cors');
 


var indexRouter = require('./routers/index');
// var usersRouter = require('./routers/users');

 var itemRouter = require('./routers/item');

var PORT = 8080;


var app = express();
 
app.use(cors({
  origin: 'http://localhost:4200'
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');// for jade configuratiom. check index directory 

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

 app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/items',itemRouter)

//const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://appraisal_app:appraisal_app@appraisalapp.ke7g8.mongodb.net/appraisalapp?retryWrites=true&w=majority";


  try {
    mongoose.connect( uri, {useNewUrlParser: true, useUnifiedTopology: true}, () =>
    console.log("mongodb connected"));    
    }catch (error) { 
    console.log("could not connect");    
    }
 



// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


app.listen(PORT, function () {
  console.log('Listening on port ' + PORT);
});


module.exports = app;
