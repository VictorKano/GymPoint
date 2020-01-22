import Joi from '@hapi/joi';

import Registration from '../models/Registration';
import Plan from '../models/Plan';

class RegistrationController {
  async store(req, res) {
    const schema = Joi.object({
      student_id: Joi.number().required(),
      plan_id: Joi.number().required(),
      start_date: Joi.date().required(),
    });

    if ((await schema.validate(req.body).error) !== undefined) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const plan = await Plan.findByPk(req.body.plan_id);

    if (!plan) {
      return res.status(400).json({ error: 'Please inform a valid plan' });
    }

    const price = plan.calcFinalPrice();

    const end_date = await Registration.calcEndDate(req, plan);

    const registration = req.body;
    registration.end_date = end_date;
    registration.price = price;

    await Registration.create(registration);

    return res.json(registration);
  }

  async index(req, res) {
    const registration = await Registration.findAll();

    return res.json(registration);
  }

  async update(req, res) {
    const schema = Joi.object({
      plan_id: Joi.number().required(),
      start_date: Joi.date().required(),
    });

    if ((await schema.validate(req.body).error) !== undefined) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const registration = await Registration.findByPk(req.params.id);

    if (!registration) {
      return res
        .status(400)
        .json({ error: 'Please inform a valid registration.' });
    }

    const plan = await Plan.findByPk(req.body.plan_id);

    if (!plan) {
      return res.status(400).json({ error: 'Please inform a valid plan' });
    }

    const updatedRegistration = await registration.update({
      start_date: req.body.start_date,
      plan_id: req.body.plan_id,
      end_date: await Registration.calcEndDate(req, plan),
      price: await plan.calcFinalPrice(),
    });

    return res.json(updatedRegistration);
  }

  async delete(req, res) {
    const registration = Registration.findByPk(req.params.id);
    if (!registration) {
      return res.status(400).json({ error: 'Registration not found.' });
    }

    await Registration.destroy({ where: { id: req.params.id } });

    return res.json();
  }
}

export default new RegistrationController();
