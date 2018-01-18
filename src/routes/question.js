import KoaRouter from 'koa-router';
import controllers from '../controllers/';

const router = new KoaRouter({
  prefix: '/api/question'
});

router
//   .get('/', controllers.exam.getAllExams)
  .get('/exam/:examId', controllers.question.getQuestionByExamId)
  // .get('/:id', controllers.book.getBookById)
  // .get('/isbn/:isbn', controllers.book.getBookByIsbn)
  // .get('/query/:text', controllers.book.queryBooksByPage)
  // .post('/', controllers.book.addBook)
  // .put('/', controllers.book.updateBook)
  // .delete('/:id', controllers.book.deleteBook)
  // .get('/douban/:isbn', controllers.book.getBookFromDouBan)

module.exports = router