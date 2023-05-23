import { Model, DataTypes } from 'sequelize';
import { sequelize } from "../config/database";
import { v4 as uuidv4 } from 'uuid';

class Category extends Model {
    public uuid!: string
    public name!: string
};

Category.init({
    uuid: {
        type: DataTypes.UUID, // <- Altere para UUID
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
    modelName: 'Category',
    tableName: "categories",
    timestamps: false
});

Category.beforeCreate((model, options) => {
    model.uuid = uuidv4();
});
export default Category;