const express = require('express');
const app = express();
const productRoutes = require('./api/routes/quotes');

//Route which should handle requests
app.use('/quotes',productRoutes);
module.exports = app;
