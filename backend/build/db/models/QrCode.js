"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const uuid_1 = require("uuid");
class QrCode extends sequelize_1.Model {
}
QrCode.init({
    uuid: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true
    },
    uuid_company_table: {
        type: sequelize_1.DataTypes.STRING
    },
    image: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    tableName: "qrcode",
    timestamps: false,
    sequelize: database_1.sequelize
});
QrCode.beforeCreate((model, options) => {
    model.uuid = (0, uuid_1.v4)();
});
exports.default = QrCode;
