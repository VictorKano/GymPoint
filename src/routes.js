import Router from 'express';
import SessionController from './app/controllers/SessionController';

const routes = new Router();

routes.post('/admin-user', SessionController.store);

export default routes;
