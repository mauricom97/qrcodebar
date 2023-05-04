"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const uuid_1 = require("uuid");
class Stock extends sequelize_1.Model {
}
Stock.init({
    item_uuid: {
        type: sequelize_1.DataTypes.STRING
    },
    quantity: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    tableName: "stock",
    timestamps: false,
    sequelize: database_1.sequelize
});
Stock.beforeCreate((model, options) => {
    model.uuid = (0, uuid_1.v4)();
});
exports.default = Stock;
