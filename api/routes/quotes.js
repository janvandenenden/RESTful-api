const express = require("express");
const router = express.Router();
const Quote = require("../models/quotes.js");
const mongoose = require("mongoose");

router.get('/', (req, res, next) => {
  Quote.find()
  .exec()
  .then(doc => {
    console.log(doc);
    if (doc){
      res.status(200).json(doc)
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
      message:'Handling POST requests to /quotes',
      createdQuote: quote
    });
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
      res.status(200).json(doc)
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
router.patch('/:quoteId', (req, res, next) => {
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
    console.log(result);
    res.status(200).json(result);
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
    console.log(doc);
    console.log("it is deleted");
    res.status(200).json(doc)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({error:err})
  });
});

module.exports = router;
