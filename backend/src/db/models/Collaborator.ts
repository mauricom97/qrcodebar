import { Model, DataTypes } from 'sequelize';
import { sequelize } from "../config/database"
import { v4 as uuidv4 } from 'uuid';

class Collaborator extends Model {
    public uuid!: string
    public firstName!: string
    public lastName!: string
    public email!: string
    public phone!: string
    public birthday!: Date
    public type!: number
}

Collaborator.init({
    uuid: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    firstName: {
        type: DataTypes.STRING
    },
    lastName: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    phone: {
        type: DataTypes.STRING
    },
    birthday: {
        type: DataTypes.DATE
    },
    type: {
        type: DataTypes.INTEGER
    }
}, {
    sequelize,
    modelName: 'Collaborator',
    tableName: "collaborators",
    timestamps: false,
    schema: 'qrcodebaradmin'
})
Collaborator.beforeCreate((model, options) => {
    model.uuid = uuidv4();
});
Collaborator.sync();
export default Collaborator