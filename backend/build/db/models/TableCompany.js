"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const uuid_1 = require("uuid");
class TableCompany extends sequelize_1.Model {
}
TableCompany.init({
    uuid: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true
    },
    num: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true
    },
    description: {
        type: sequelize_1.DataTypes.TEXT
    }
}, {
    tableName: "company_table",
    timestamps: false,
    sequelize: database_1.sequelize
});
TableCompany.beforeCreate((model, options) => {
    model.uuid = (0, uuid_1.v4)();
});
exports.default = TableCompany;
