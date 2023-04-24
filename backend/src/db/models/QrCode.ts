import { Model, DataTypes } from "sequelize"
import { sequelize } from "../config/database"
import { v4 as uuidv4 } from 'uuid';

class QrCode extends Model { 
    public uuid!: string
    public qrcode!: string
}

QrCode.init({
    uuid: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    uuid_company_table: {
        type: DataTypes.STRING
    },
    image: {
        type: DataTypes.STRING
    }
}, {
    tableName: "qrcode",
    timestamps: false,
    sequelize
})
QrCode.beforeCreate((model, options) => {
    model.uuid = uuidv4();
  });
export default QrCode