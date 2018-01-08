import KoaRouter from 'koa-router';
import controllers from '../controllers/';

const router = new KoaRouter({
  prefix: '/api/book'
});

router
  .get('/', controllers.book.getAllBooks)
  .get('/:id', controllers.book.getBookById)
  .get('/isbn/:isbn', controllers.book.getBookByIsbn)
  .get('/query/:text', controllers.book.queryBooksByPage)
  .post('/', controllers.book.addBook)
  // .post('/auth', controllers.auth.decryptData)
  .put('/', controllers.book.updateBook)
  .delete('/:id', controllers.book.deleteBook)
  .get('/douban/:isbn', controllers.book.getBookFromDouBan)

module.exports = router