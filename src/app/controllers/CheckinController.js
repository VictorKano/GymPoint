import { subDays } from 'date-fns';
import { Op } from 'sequelize';
import Checkin from '../models/Checkin';
import Student from '../models/Student';

class CheckinController {
  async store(req, res) {
    const student = await Student.findByPk(req.params.id);

    if (!student) {
      return res.status(400).json({ error: 'Student not found.' });
    }

    const current_date = new Date(Date.now());

    const before_date = subDays(current_date, 7);

    const checkins = await Checkin.findAll({
      where: {
        createdAt: { [Op.between]: [before_date, current_date] },
        student_id: req.params.id,
      },
    });

    if (checkins.length >= 5) {
      return res.status(400).json({ error: 'Checkin denied.' });
    }

    const checkin = await Checkin.create({
      student_id: req.params.id,
    });

    return res.json(checkin);
  }
}

export default new CheckinController();
