import { Model, DataTypes } from 'sequelize';
import { sequelize } from "../config/database"
import { v4 as uuidv4 } from 'uuid';
import Category from './Category';

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
        type: DataTypes.UUID, // <- Altere para UUID
        defaultValue: DataTypes.UUIDV4,
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
        type: DataTypes.UUID, // <- Altere para UUID
    },
    company_uuid: {
        type: DataTypes.UUID,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Item',
    tableName: "itens",
    timestamps: false,
    schema: 'public'
})


Item.belongsTo(Category, { foreignKey: 'category' });
Item.beforeCreate((model, options) => {
    model.uuid = uuidv4();
});
Item.sync();
export default Item