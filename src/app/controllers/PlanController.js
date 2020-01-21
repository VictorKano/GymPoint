import Joi from '@hapi/joi';
import Plan from '../models/Plan';

class PlanController {
  async index(req, res) {
    const plans = await Plan.findAll();
    return res.json(plans);
  }

  async store(req, res) {
    const schema = Joi.object({
      title: Joi.string().required(),
      price: Joi.number().required(),
      duration: Joi.number().required(),
    });

    if ((await schema.validate(req.body).error) !== undefined) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const plan = await Plan.create(req.body);

    return res.json(plan);
  }

  async update(req, res) {
    const schema = Joi.object({
      title: Joi.string(),
      price: Joi.number(),
      duration: Joi.number(),
    });

    if ((await schema.validate(req.body).error) !== undefined) {
      return res.status(400).json({ error: 'Validation Fails.' });
    }

    const plan = await Plan.findByPk(req.params.id);

    if (!plan) {
      return res.status(400).json({ error: 'Plan not found.' });
    }

    const updatedPlan = await plan.update(req.body);
    return res.json(updatedPlan);
  }

  async delete(req, res) {
    const plan = await Plan.findByPk(req.params.id);
    if (!plan) {
      return res.status(400).json({ error: 'Plan not found.' });
    }

    await Plan.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.json();
  }
}

export default new PlanController();
