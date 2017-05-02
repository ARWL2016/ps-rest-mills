const should = require('should'), 
      request = require('supertest'), 
      app = require('../app.js'), 
      mongoose = require('mongooose'), 
      Book = mongoose.model('Book'), 
      agent = request.agent(app); 

describe('Book crud tests', () => {
  it('should allow a book to be post and should return read and _id', (done) => {
    var bookPost = {
      title: 'new book', 
      author: 'Al', 
      genre: 'Fiction'
    }; 

    agent.post('/api/books')
      .send(bookPost)
      .expect(200)
      .end((err, results) => {
        results.body.read.should.equal(false); 
        results.body.should.have.property('_id'); 
        done(); 
      })
  })

  afterEach((done) => {
    Book.remove().exec(); 
    done(); 
  })
})