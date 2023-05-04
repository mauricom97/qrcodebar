"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const uuid_1 = require("uuid");
class CollaboratorsLogin extends sequelize_1.Model {
}
CollaboratorsLogin.init({
    uuid: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true
    },
    username: {
        type: sequelize_1.DataTypes.STRING
    },
    password: {
        type: sequelize_1.DataTypes.STRING
    },
    collaborator_uuid: {
        type: sequelize_1.DataTypes.STRING
    },
    company_uuid: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    sequelize: database_1.sequelize,
    modelName: 'CollaboratorsLogin',
    tableName: "collaboratorsLogin",
    timestamps: false,
    schema: 'qrcodebaradmin'
});
CollaboratorsLogin.beforeCreate((model, options) => {
    model.uuid = (0, uuid_1.v4)();
});
CollaboratorsLogin.sync();
exports.default = CollaboratorsLogin;
