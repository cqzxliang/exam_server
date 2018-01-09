import KoaRouter from 'koa-router';
import controllers from '../controllers/';

const router = new KoaRouter({
  prefix: '/api/settings'
});

router
  .get('/', controllers.settings.getSettings)
  .post('/', controllers.settings.updateSettings)

module.exports = router