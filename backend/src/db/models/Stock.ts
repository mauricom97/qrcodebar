import { Model, DataTypes } from "sequelize"
import { sequelize } from "../config/database"
import { v4 as uuidv4 } from 'uuid';

class Stock extends Model { 
    public uuid!: string
}

Stock.init({
    item_uuid: {
        type: DataTypes.STRING
    },
    quantity: {
        type: DataTypes.STRING
    }
}, {
    tableName: "stock",
    timestamps: false,
    sequelize
})
Stock.beforeCreate((model, options) => {
    model.uuid = uuidv4();
  });
export default Stock