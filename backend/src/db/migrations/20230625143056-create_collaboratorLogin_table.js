'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('collaboratorsLogin', {
      uuid: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      username: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      collaborator_uuid: {
        type: Sequelize.STRING,
      },
      company_uuid: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('collaboratorsLogin');
  }
};
