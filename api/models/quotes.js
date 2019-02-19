const mongoose = require('mongoose');

const quoteSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  author: {type:String, required:true},
  quote: {type:String, required:true}
});

module.exports = mongoose.model('Quote', quoteSchema)
