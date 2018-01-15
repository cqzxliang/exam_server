import KoaRouter from 'koa-router';
import controllers from '../controllers/';

const router = new KoaRouter({
  prefix: '/api/auth'
});

router
  .get('/:code', controllers.auth.getOpenId)
  .post('/', controllers.auth.decryptData)

module.exports = router