import Router from 'express';

import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';

import AuthMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/admin-user', SessionController.store);

routes.use(AuthMiddleware);
routes.post('/students', StudentController.store);

routes.get('/plans', PlanController.index);
routes.post('/plans', PlanController.store);
routes.put('/plans/:id', PlanController.update);
routes.delete('/plans/:id', PlanController.delete);

export default routes;
