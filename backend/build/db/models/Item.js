"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const uuid_1 = require("uuid");
class Item extends sequelize_1.Model {
}
Item.init({
    uuid: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING
    },
    price: {
        type: sequelize_1.DataTypes.FLOAT
    },
    description: {
        type: sequelize_1.DataTypes.TEXT
    },
    menu: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    category: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    sequelize: database_1.sequelize,
    modelName: 'Item',
    tableName: "itens",
    timestamps: false,
    schema: 'public'
});
Item.beforeCreate((model, options) => {
    model.uuid = (0, uuid_1.v4)();
});
Item.sync();
exports.default = Item;
