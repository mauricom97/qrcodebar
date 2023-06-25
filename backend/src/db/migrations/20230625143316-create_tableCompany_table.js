'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('company_table', {
      uuid: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      num: {
        type: Sequelize.INTEGER,
        autoIncrement: true
      },
      company_uuid: {
        type: Sequelize.UUID,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('company_table');
  }
};
