const express = require('express'); 
const mongoose = require('mongoose');
const chalk = require('chalk'); 
const bookRoutes = require('./routes/bookRoutes')(); 

const db = mongoose.connect('mongodb://localhost/bookAPI');

const app = express(); 

let port = process.env.PORT || 3000; 

app.get('/', (req, res) => {
    res.send('Welcome to my API!'); 
});

app.use('/api', bookRoutes);

app.listen(port, () => {
    console.log(chalk.green(`Running on port ${port}`));
}); 