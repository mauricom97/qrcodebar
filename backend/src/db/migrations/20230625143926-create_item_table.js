'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('itens', {
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.FLOAT
      },
      description: {
        type: Sequelize.TEXT
      },
      menu: {
        type: Sequelize.BOOLEAN
      },
      category: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'categories',
          key: 'uuid'
        }
      },
      company_uuid: {
        type: Sequelize.UUID,
        allowNull: false
      },
    });

    await queryInterface.addConstraint('itens', {
      fields: ['category'],
      type: 'foreign key',
      name: 'fk_item_category',
      references: {
        table: 'categories',
        field: 'uuid'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('itens', 'fk_item_category');
    await queryInterface.dropTable('itens');
  }
};
