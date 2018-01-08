import book_route from './book';
import auth_route from './auth';
import user_route from './user';

function route(app) {
  const addRoute = (route, app) => app.use(route.routes()).use(route.allowedMethods());
  addRoute(book_route, app);
  addRoute(auth_route, app);
  addRoute(user_route, app);
}

module.exports = route;