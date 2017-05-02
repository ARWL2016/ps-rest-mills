const express = require('express'); 
const chalk = require('chalk');

module.exports = (Book) => {
  const bookRouter = express.Router();
  const { post, get, getById, putById, patchById, deleteById, findById } 
      = require('../controllers/bookController')(Book);

  bookRouter.route('/')
    .post(post)
    .get(get); 

  bookRouter.use('/:bookId', findById);

  bookRouter.route('/:bookId')
    .get(getById)
    .put(putById)
    .patch(patchById)
    .delete(deleteById); 

  return bookRouter; 

}

