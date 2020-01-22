import Sequelize, { Model } from 'sequelize';

class Plan extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        price: Sequelize.DECIMAL,
        duration: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  calcFinalPrice() {
    return this.price * this.duration;
  }
}

export default Plan;
