const express = require('express'); 
const bookRouter = express.Router(); 
const Book = require('../models/bookModel');

module.exports = () => {

  bookRouter.route('/Books')
  .get((req, res) => {
    const query = {}; 

    if (req.query.genre) {
      query.genre = req.query.genre; 
    } 
    Book.find(query, (err, books) => {
      if(err) {
        res.status(500).send(err);
      } else {
        res.json(books);
      }    
   });    
  }); 

  bookRouter.route('/Books/:bookId')
  .get((req, res) => {
    
    Book.findById(req.params.bookId, (err, book) => {
      if(err) {
        res.status(500).send(err);
      } else {
        res.json(book);
      }    
   });    
  }); 

  return bookRouter; 

}

