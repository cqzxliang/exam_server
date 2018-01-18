import exam_route from './exam';
import question_route from './question';
import answer_route from './answer';

function route(app) {
  const addRoute = (route, app) => app.use(route.routes()).use(route.allowedMethods());
  addRoute(exam_route, app);
  addRoute(question_route, app);
  addRoute(answer_route, app);
}

module.exports = route;