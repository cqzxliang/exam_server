import KoaRouter from 'koa-router';
import controllers from '../controllers/';

const router = new KoaRouter({
  prefix: '/api/exam'
});

router
  .get('/', controllers.exam.getAllExams)
  .get('/:id', controllers.exam.getExamById)
  // .get('/:id', controllers.book.getBookById)
  // .get('/isbn/:isbn', controllers.book.getBookByIsbn)
  // .get('/query/:text', controllers.book.queryBooksByPage)
  // .post('/', controllers.book.addBook)
  // .put('/', controllers.book.updateBook)
  // .delete('/:id', controllers.book.deleteBook)
  // .get('/douban/:isbn', controllers.book.getBookFromDouBan)

module.exports = router