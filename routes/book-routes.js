const express = require('express'); 
const bookRouter = express.Router(); 

module.exports = (Book) => {

  bookRouter.route('/')
  .post((req, res) => {
    var book = new Book(req.body); 

    book.save(); 
    res.status(201).send(book); 
  })
  .get((req, res) => {
    const query = {}; 

    if (req.query.genre) {
      query.genre = req.query.genre; 
    } 
    Book.find(query, (err, books) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(books);
      }    
   });    
  }); 

  bookRouter.use('/:bookId', (req, res, next) => {
    Book.findById(req.params.bookId, (err, book) => {
      if (err) {
        res.status(500).send(err);
      } else if (book) {
        req.book = book; 
        next(); 
      } else {
        res.status(404).send('Book not found'); 
      }    
   });  
  });

  bookRouter.route('/:bookId')
    .get((req, res) => {
      res.json(req.book);   
    })
  .put((req, res) => {
    req.book.title = req.body.title; 
    req.book.author = req.body.author; 
    req.book.genre = req.body.genre; 
    req.book.read = req.body.read; 
    req.book.save((error) => {
      if (error) {
        res.status(500).send(error); 
      } else {
        res.json(req.book); 
      }
    }); 
  })
  .patch((req, res) => {
    if (req.body._id) {
      delete req.body._id; 
    }
    for (let prop in req.body) {
      req.book[prop] = req.body[prop]; 
    }  
    req.book.save((error) => {
      if (error) {
        res.status(500).send(error); 
      } else {
        res.json(req.book); 
      }
    }); 
  })
  .delete((req, res) => {
    req.book.remove((error) => {
      if (error) res.status(500).send(error); 
      else res.status(204).send('Removed'); 
    }); 
  }); 

  return bookRouter; 

}

