const mongoose = require('mongoose');

const quoteSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  author: String,
  quote: String,
});

module.exports = mongoose.model('Quote', quoteSchema)
