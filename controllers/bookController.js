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

  return { post, get };
}
