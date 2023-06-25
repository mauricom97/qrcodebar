'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('companies', {
      uuid: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      cnpj: {
        type: Sequelize.STRING,
      },
      stateRegistration: {
        type: Sequelize.STRING,
      },
      razaoSocial: {
        type: Sequelize.STRING,
      },
      nomeFantasia: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      state: {
        type: Sequelize.STRING,
      },
      city: {
        type: Sequelize.STRING,
      },
      neighborhood: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('companies');
  }
};
 