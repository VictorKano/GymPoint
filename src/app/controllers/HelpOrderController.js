import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

class HelpOrderController {
  async index(req, res) {
    const student = await Student.findByPk(req.params.id);

    if (!student) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const helpOrders = await HelpOrder.findAll({
      where: {
        student_id: req.params.id,
      },
    });

    return res.json(helpOrders);
  }
}

export default new HelpOrderController();
