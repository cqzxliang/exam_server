import book_route from './book';

function route(app) {
  const addRoute = (route, app) => app.use(route.routes()).use(route.allowedMethods());
  addRoute(book_route, app);
}

module.exports = route;