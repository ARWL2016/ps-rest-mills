const express = require('express'); 

module.exports = (Book) => {
  const bookRouter = express.Router();

  const bookController = require('../controllers/bookController')(Book);
  bookRouter.route('/')
  .post(bookController.post)
  .get(bookController.get); 

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

      const returnBook = req.book.toJSON(); 
      // adding to the obj is done in 2 stages, else links will return undefined
      returnBook.links = {}; 
      var newLink = `http://${req.headers.host}/api/books/?genre=returnBook.genre${book._id}`; 
      returnBook.links.FilterByThisGenre = newLink.replace(' ', '%20'); 
      res.json(returnBook);   
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

