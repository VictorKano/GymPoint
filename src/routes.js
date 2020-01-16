import Router from 'express';

const routes = new Router();

routes.post('/admin-user', (req, res) => {
  return res.json({ ok: true });
});

export default routes;
