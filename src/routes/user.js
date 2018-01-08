import KoaRouter from 'koa-router';
import controllers from '../controllers/';

const router = new KoaRouter({
  prefix: '/api/user'
});

router
  .get('/:openid', controllers.user.getUserByOpenId)
  .post('/', controllers.user.addUser)
  .put('/', controllers.user.updateUser)

module.exports = router