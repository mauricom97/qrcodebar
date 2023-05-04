"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const uuid_1 = require("uuid");
class Collaborator extends sequelize_1.Model {
}
Collaborator.init({
    uuid: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING
    },
    email: {
        type: sequelize_1.DataTypes.STRING
    },
    phone: {
        type: sequelize_1.DataTypes.STRING
    },
    birthday: {
        type: sequelize_1.DataTypes.DATE
    },
    type: {
        type: sequelize_1.DataTypes.INTEGER
    }
}, {
    sequelize: database_1.sequelize,
    modelName: 'Collaborator',
    tableName: "collaborators",
    timestamps: false,
    schema: 'qrcodebaradmin'
});
Collaborator.beforeCreate((model, options) => {
    model.uuid = (0, uuid_1.v4)();
});
Collaborator.sync();
exports.default = Collaborator;
