import KoaRouter from 'koa-router';
import controllers from '../controllers/';

const router = new KoaRouter({
  prefix: '/api/answer'
});

router
  .get('/seq/:userId', controllers.answer.getSeq)
  .post('/', controllers.answer.addAnswer)

module.exports = router