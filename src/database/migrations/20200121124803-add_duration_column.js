module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('plans', 'duration', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('plans', 'duration');
  },
};
