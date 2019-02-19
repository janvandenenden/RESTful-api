const express = require("express");
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    message:'Handling GET resquests to /quotes'
  });
});

router.post('/', (req, res, next) => {
  const quote = {
    author: req.body.author,
    quote: req.body.quote,
  };
  res.status(201).json({
    message:'Handling POST resquests to /quotes',
    createdQuote: quote
  });
});

router.get('/:quoteId', (req, res, next) => {
  res.status(200).json({
    message:'Handling GET resquests to /quotes:id',
    message:('test',req.params.quoteId)
  });
});

router.patch('/:quoteId', (req, res, next) => {
  res.status(200).json({
    message:'Handling PUT resquests to /quotes:id'
  });
});

router.delete('/:quoteId', (req, res, next) => {
  res.status(200).json({
    message:'Handling DELETE resquests to /quotes:id'
  });
});

module.exports = router;
