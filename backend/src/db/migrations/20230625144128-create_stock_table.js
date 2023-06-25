'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('stock', {
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      item_uuid: {
        type: Sequelize.STRING
      },
      quantity: {
        type: Sequelize.STRING
      },
      company_uuid: {
        type: Sequelize.UUID,
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('stock');
  }
};
