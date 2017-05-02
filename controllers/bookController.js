module.exports = (Book) => {

  const post = (req, res) => {
    const book = new Book(req.body); 

    if (!req.body.title) {
      res.status(400); 
      res.send('Title is required'); 
      // chaining these calls doesnt play well with mocha
    } else {
      book.save(); 
      res.status(201);
      res.send(book); 
    }
  }

  const get = (req, res) => {
    const query = {}; 

    if (req.query.genre) {
      query.genre = req.query.genre; 
    } 
    Book.find(query, (err, books) => {
      if (err) {
        res.status(500).send(err);
      } else {

        const returnBooks = []; 
        books.forEach((bookModel, index, array) => {
          // strip out the Mongoose model and leave plain JSON
          let book = bookModel.toJSON(); 
          book.link = `http://${req.headers.host}/api/books/${book._id}`; 
          returnBooks.push(book); 
        })
        res.json(returnBooks);
      }    
   });    
  }

  findById = (req, res, next) => {
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
  }

  const getById = (req, res) => {

      const returnBook = req.book.toJSON(); 
      // adding to the obj is done in 2 stages, else links will return undefined
      returnBook.links = {}; 
      const newLink = `http://${req.headers.host}/api/books/?genre=${returnBook.genre}`; 
      returnBook.links.FilterByThisGenre = newLink.replace(' ', '%20'); 
      res.json(returnBook);   
  }
  
  const putById = (req, res) => {
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
  }

  patchById = (req, res) => {
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
  }

  deleteById = (req, res) => {
    req.book.remove((error) => {
      if (error) {
        res.status(500).send(error); 
      } else {
        res.status(204).send('Removed'); 
      }
    }); 
  }

  return { post, get, getById, putById, patchById, deleteById, findById };
}
