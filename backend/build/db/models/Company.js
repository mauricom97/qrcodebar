"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const uuid_1 = require("uuid");
class Company extends sequelize_1.Model {
}
Company.init({
    uuid: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true
    },
    cnpj: {
        type: sequelize_1.DataTypes.STRING
    },
    stateRegistration: {
        type: sequelize_1.DataTypes.STRING
    },
    razaoSocial: {
        type: sequelize_1.DataTypes.STRING
    },
    nomeFantasia: {
        type: sequelize_1.DataTypes.STRING
    },
    phone: {
        type: sequelize_1.DataTypes.STRING
    },
    state: {
        type: sequelize_1.DataTypes.STRING
    },
    city: {
        type: sequelize_1.DataTypes.STRING
    },
    neighborhood: {
        type: sequelize_1.DataTypes.STRING
    },
    address: {
        type: sequelize_1.DataTypes.STRING
    },
    schemaName: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    sequelize: database_1.sequelize,
    modelName: 'Company',
    tableName: "companies",
    timestamps: false,
    schema: 'qrcodebaradmin'
});
Company.beforeCreate((model, options) => {
    model.uuid = (0, uuid_1.v4)();
});
Company.sync();
exports.default = Company;
