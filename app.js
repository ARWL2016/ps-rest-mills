const express = require('express'); 
const mongoose = require('mongoose');
const chalk = require('chalk'); 

const db = mongoose.connect('mongodb://localhost/bookAPI');
var Book = require('./models/bookModel');

var app = express(); 

var port = process.env.PORT || 3000; 

bookRouter = express.Router(); 

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

app.use('/api', bookRouter);

app.get('/', function (req, res) {
    res.send('Welcome to my API!'); 
});

app.listen(port, () => {
    console.log(chalk.green(`Running on port ${port}`));
}); 