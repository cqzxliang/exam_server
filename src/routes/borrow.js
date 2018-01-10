import KoaRouter from 'koa-router';
import controllers from '../controllers/';

const router = new KoaRouter({
  prefix: '/api/borrow'
});

router
  .get('/count/:userId', controllers.borrow.getBorrowCount)
  .get('/', controllers.borrow.getBorrowByUserId)
  .get('/status/', controllers.borrow.getBorrowStatus)
  .post('/', controllers.borrow.addBorrow)

module.exports = router