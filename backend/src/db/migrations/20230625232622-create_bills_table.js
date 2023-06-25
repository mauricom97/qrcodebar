'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('bills', {
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      code: {
        type: Sequelize.INTEGER
      },
      uuid_item: {
        type: Sequelize.UUID,
        references: {
          model: 'itens',
          key: 'uuid'
        }
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      uuid_table: {
        type: Sequelize.UUID
      },
      company_uuid: {
        type: Sequelize.UUID,
        allowNull: false
      },
      descriptionBill: {
        type: Sequelize.STRING
      },
      createdAt: {
        type: Sequelize.STRING,
        defaultValue: new Date().toISOString()
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('bills');
  }
};
