module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('students', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },
      idade: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      peso: {
        type: Sequelize.REAL,
        allowNull: true,
      },
      altura: {
        type: Sequelize.REAL,
        allowNull: true,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('students');
  },
};
