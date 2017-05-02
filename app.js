const express = require('express'), 
      mongoose = require('mongoose'),
      chalk = require('chalk'), 
      bodyParser = require('body-parser'),
      Book = require('./models/bookModel');
console.log(chalk.red(Book, typeof Book));
 
if (process.env.ENV === 'Test') {
  let db = mongoose.connect('mongodb://localhost/bookAPI_test');
} else {
  let db = mongoose.connect('mongodb://localhost/bookAPI');
}

const app = express(); 

let port = process.env.PORT || 3000; 

const bookRoutes = require('./routes/book-routes')(Book); 

app.use(bodyParser.urlencoded({extended: true})); 
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Welcome to my API!'); 
});

app.use('/api/books', bookRoutes);

app.listen(port, () => {
    console.log(chalk.green(`Running on port ${port}`));
}); 

// export app for supertest
module.exports = app; 