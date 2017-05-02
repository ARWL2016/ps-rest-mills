const should = require('should'); 
const sinon = require('sinon'); 

describe('Book Controller Tests', () => {
  describe('Post', () => {
    it('should not allow an empty title on post', () => {
      var Book = (book) => { 
        this.save = function(){
          // this function mocks the Book model 
        } 
      };

      var req = {
        body: {
          authors: 'Jon'
        }
      };

      var res = {
        status: sinon.spy(), 
        send: sinon.spy() 
      };

      var bookController = require('../controllers/BookController')(Book); 
      
      bookController.post(req, res); 

      res.status.calledWith(400).should.equal(true, `Bad status ${res.status.args[0][0]}` ), 
      res.send.calledWith('Title is required').should.equal(true);     })
  })
})