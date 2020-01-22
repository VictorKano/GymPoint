import Router from 'express';

import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import RegistrationController from './app/controllers/RegistrationController';
import CheckinController from './app/controllers/CheckinController';
import QuestionController from './app/controllers/QuestionController';
import HelpOrderController from './app/controllers/HelpOrderController';
import AnswerController from './app/controllers/AnswerController';

import AuthMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/admin-user', SessionController.store);

routes.use(AuthMiddleware);
routes.post('/students', StudentController.store);

routes.post('/students/:id/checkins', CheckinController.store);

routes.get('/plans', PlanController.index);
routes.post('/plans', PlanController.store);
routes.put('/plans/:id', PlanController.update);
routes.delete('/plans/:id', PlanController.delete);

routes.post('/registrations', RegistrationController.store);
routes.get('/registrations', RegistrationController.index);
routes.put('/registrations/:id', RegistrationController.update);
routes.delete('/registrations/:id', RegistrationController.delete);

routes.post('/students/:id/help-orders', QuestionController.store);
routes.get('/students/:id/help-orders', HelpOrderController.index);

routes.post('/students/:id/answer', AnswerController.store);

export default routes;
