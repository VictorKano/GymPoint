import Joi from '@hapi/joi';

import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

class QuestionController {
  async store(req, res) {
    const schema = Joi.object({
      question: Joi.string().required(),
    });

    if ((await schema.validate(req.body).error) !== undefined) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const student = await Student.findByPk(req.params.id);

    if (!student) {
      return res.status(400).json({ error: 'Student not found.' });
    }

    const helpOrder = await HelpOrder.create({
      student_id: req.params.id,
      question: req.body.question,
    });

    return res.json(helpOrder);
  }
}

export default new QuestionController();
