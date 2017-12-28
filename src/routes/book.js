import KoaRouter from 'koa-router';
import controllers from '../controllers/';

const router = new KoaRouter({
  prefix: '/api/book'
});

router
  .get('/', controllers.book.getAllBooks)
  .get('/:id', controllers.book.getBookById)
  .post('/', controllers.book.addBook)
  .put('/:id', controllers.book.updateBook)
  .delete('/:id', controllers.book.deleteBook)
  .get('/douban/:isbn', controllers.book.getBookFromDouBan)

module.exports = router