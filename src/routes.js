import Router from 'express';

import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';

import AuthMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/admin-user', SessionController.store);

routes.use(AuthMiddleware);
routes.post('/students', StudentController.store);

export default routes;
