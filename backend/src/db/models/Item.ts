import { Model, DataTypes } from 'sequelize';
import { sequelize } from "../config/database"
import { v4 as uuidv4 } from 'uuid';

class Item extends Model {
    public uuid!: string
    public name!: string
    public price!: number
    public menu!: boolean
    public category!: string
    public schema!: string
}

Item.init({
    uuid: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.FLOAT
    },
    description: {
        type: DataTypes.TEXT
    },
    menu: {
        type: DataTypes.BOOLEAN
    },
    category: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
    modelName: 'Item',
    tableName: "itens",
    timestamps: false,
    schema: 'public'
})
Item.beforeCreate((model, options) => {
    model.uuid = uuidv4();
});
Item.sync();
export default Item