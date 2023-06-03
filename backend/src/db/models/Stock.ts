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
    },
    company_uuid: {
        type: DataTypes.UUID,
        allowNull: false,
    },
}, {
    tableName: "stock",
    timestamps: false,
    schema: 'public',
    sequelize
})
Stock.beforeCreate((model, options) => {
    model.uuid = uuidv4();
  });
export default Stock