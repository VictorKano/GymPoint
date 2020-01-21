import Joi from '@hapi/joi';
import Student from '../models/Student';

class StudentController {
  async store(req, res) {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().required(),
      idade: Joi.number().required(),
      peso: Joi.number().required(),
      altura: Joi.number().required(),
    });

    if ((await schema.validate(req.body).error) !== undefined) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const studentExists = await Student.findOne({
      where: { email: req.body.email },
    });

    if (studentExists) {
      return res.status(400).json({ error: 'Student already exists.' });
    }

    const student = await Student.create(req.body);

    return res.json(student);
  }
}

export default new StudentController();
