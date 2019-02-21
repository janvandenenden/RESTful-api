const express = require("express");
const router = express.Router();
const Quote = require("../models/quotes.js");
const mongoose = require("mongoose");

router.get('/', (req, res, next) => {
  Quote.find()
  .select("_id author quote")
  .exec()
  .then(doc => {
    const response = {
      count: doc.length,
      quotes:doc.map(doc => {
        return {
          author:doc.author,
          quote:doc.quote,
          _id:doc._id,
          request:{
            type:'GET',
            description:'follow link to go to quote',
            url:'http://localhost:5000/quotes/' + doc._id
          }
        }
      })
    }
    if (doc){
      res.status(200).json(response)
    } else {
      res.status(404).json({message:"This is not the right URL"})
    }
  })
    .catch(err => {
      console.log(err);
      res.status(500).json({error:err})
    })
})

router.post('/', (req, res, next) => {
  const quote = new Quote({
    _id: new mongoose.Types.ObjectId(),
    author: req.body.author,
    quote: req.body.quote,
  });
  quote.save()
  .then(result => {
    console.log(result);
    res.status(201).json({
      message:'Created quote succesfully',
      createdQuote: {
        author:result.author,
        quote:result.quote,
        _id:result._id,
        request:{
          type:'GET',
          description:'Get new quote',
          url:'http://localhost:5000/quotes/' + result._id
        }
      }
    })
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({error:err})
  });
});

router.get('/:quoteId', (req, res, next) => {
  const id = req.params.quoteId;
  Quote.findById(id)
  .exec()
  .then(doc => {
    console.log(doc);
    if (doc){
      res.status(200).json(quote = {
            author: doc.author,
            quote: doc.quote,
            _id: doc._id,
            request:{
              type:'GET',
              description:'Get all quotes',
              url:'http://localhost:5000/quotes/'
            }
          })
    } else {
      res.status(404).json({message:"No quote exists under that ID"})
    }
  })
    .catch(err => {
      console.log(err);
      res.status(500).json({error:err})
    })
});


//[{"propName":"author","value":"Rick"},{"propName":"quote","value":"Where the hell is Morty"}]
router.put('/:quoteId', (req, res, next) => {
  const id = req.params.quoteId;
  const updateOps = {};
  for (const ops of req.body){
    updateOps[ops.propName] = ops.value;
  }
  Quote.update({_id:id},
    {$set:updateOps}
  )
  .exec()
  .then(result => {
    res.status(200).json({
      message:'Product updated',
      request:{
        type:'GET',
        url:'http://localhost:5000/quotes/' + id
      }
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({error:err})
  })
});

router.delete('/:quoteId', (req, res, next) => {
  const id = req.params.quoteId;
  Quote.deleteOne({
    _id:id
  })
  .exec()
  .then(doc => {
    res.status(200).json({
    message:'quote was deleted',
    author:doc.author,
    quote:doc.quote,
    _id:doc._id,
    request:{
      type:'GET',
      message:'See remaining quotes',
      url:'http://localhost:5000/quotes/'
    }
  })
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({error:err})
  });
});

module.exports = router;
