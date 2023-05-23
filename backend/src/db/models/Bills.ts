import { Model, DataTypes } from 'sequelize';
import { sequelize } from "../config/database"
import { v4 as uuidv4 } from 'uuid';

class Bill extends Model {
    public uuid!: string
    public code!: number
    public uuid_item!: string
    public quantity!: number
}

Bill.init({
    uuid: {
        type: DataTypes.UUID, // <- Altere para UUID
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    code: {
        type: DataTypes.INTEGER
    },
    uuid_item: {
        type: DataTypes.UUID
    },
    uuid_table: {
        type: DataTypes.UUID
    },
    quantity: {
        type: DataTypes.INTEGER
    },
    status: {
        type: DataTypes.INTEGER
    }
}, {
    sequelize,
    modelName: 'Bill',
    tableName: "bills",
    timestamps: false
})


Bill.beforeCreate((model, options) => {
    model.uuid = uuidv4();
});
Bill.sync();
export default Bill