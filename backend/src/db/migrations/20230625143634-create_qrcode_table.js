'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('qrcode', {
      uuid: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      uuid_company_table: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      company_uuid: {
        type: Sequelize.UUID,
        allowNull: false
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('qrcode');
  }
};
