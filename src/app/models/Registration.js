import Sequelize, { Model } from 'sequelize';
import { addMonths, parseISO } from 'date-fns';

class Registration extends Model {
  static init(sequelize) {
    super.init(
      {
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
        price: Sequelize.DECIMAL,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Student, { foreignKey: 'student_id', as: 'student' });
    this.belongsTo(models.Plan, { foreignKey: 'plan_id', as: 'plan' });
  }

  static async calcEndDate(req, plan) {
    return addMonths(parseISO(req.body.start_date), plan.duration);
  }
}

export default Registration;
