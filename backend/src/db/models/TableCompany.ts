import { Model, DataTypes } from "sequelize"
import { sequelize } from "../config/database"
import { v4 as uuidv4 } from 'uuid';

class TableCompany extends Model { 
    public uuid!: string
    public num!: number
    public description!: string
}

TableCompany.init({
    uuid: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    num: {
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    description: {
        type: DataTypes.TEXT
    }
}, {
    tableName: "company_table",
    timestamps: false,
    sequelize
})
TableCompany.beforeCreate((model, options) => {
    model.uuid = uuidv4();
  });
export default TableCompany