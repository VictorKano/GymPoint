import Joi from '@hapi/joi';
import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

import AnswerMail from '../jobs/AnswerMail';
import Queue from '../../lib/Queue';

class AnswerController {
  async store(req, res) {
    const schema = Joi.object({
      answer: Joi.string().required(),
    });

    if ((await schema.validate(req.body).error) !== undefined) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const helpOrder = await HelpOrder.findByPk(req.params.id);

    if (!helpOrder) {
      return res.status(400).json({ error: 'Help Order not found.' });
    }

    const student = await Student.findByPk(helpOrder.student_id);

    if (!student) {
      return res.status(400).json({ error: 'Student not found.' });
    }

    const updatedHelpOrder = await helpOrder.update({
      answer: req.body.answer,
      answer_at: new Date(Date.now()),
    });

    Queue.add(AnswerMail.key, {
      updatedHelpOrder,
      student,
    });

    return res.json(updatedHelpOrder);
  }
}

export default new AnswerController();
