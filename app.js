const express = require('express');
const app = express();
const morgan = require('morgan');
var timeout = require('connect-timeout')
const productRoutes = require('./api/routes/quotes');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://username:'+ process.env.MONGO_ATLAS_PW + '@node-quote-db-48exy.mongodb.net/test?retryWrites=true', { useNewUrlParser: true })



//all middleware so the date goes through these
app.use(timeout(120000));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use((req, res, next) => {
//event CORS ERROR
  res.header('Access-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-Headers',
  'Origin, X-requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS'){
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});
//Route which should handle requests
app.use('/quotes',productRoutes);
//error messages
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
})

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error:{
      message:error.message
    }
  });
});

app.use(haltOnTimedout);
function haltOnTimedout(req, res, next){
  if (!req.timedout) next();
}

module.exports = app;
