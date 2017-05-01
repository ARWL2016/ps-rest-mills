const express = require('express'); 
const mongoose = require('mongoose');
const chalk = require('chalk'); 
const bodyParser = require('body-parser'); 
const Book = require('./models/bookModel');

const db = mongoose.connect('mongodb://localhost/bookAPI');

const app = express(); 

let port = process.env.PORT || 3000; 

const bookRoutes = require('./routes/bookRoutes')(Book); 

app.use(bodyParser.urlencoded({extended: true})); 
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Welcome to my API!'); 
});

app.use('/api/books', bookRoutes);
// app.use('/api/authors', authorRoutes);

app.listen(port, () => {
    console.log(chalk.green(`Running on port ${port}`));
}); 