var bookController = (Book) => {

  var post = (req, res) => {
    var book = new Book(req.body); 

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

  var get = (req, res) => {
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
          newBook.link = `http://${req.headers.host}/api/books/${book._id}`; 
          returnBooks.push(book); 
        })
        res.json(returnBooks);
      }    
   });    
  }

  return { post, get };
}

module.exports = bookController; 