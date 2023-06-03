import { Model, DataTypes } from 'sequelize';
import { sequelize } from "../config/database"
import { v4 as uuidv4 } from 'uuid';

class CollaboratorsLogin extends Model {
    public uuid!: string
    public username!: string
    public password!: string
    public collaborator_uuid!: string
    public company_uuid!: string
}

CollaboratorsLogin.init({
    uuid: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    collaborator_uuid: {
        type: DataTypes.STRING
    },
    company_uuid: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'CollaboratorsLogin',
    tableName: "collaboratorsLogin",
    timestamps: false,
    schema: 'public'
})
CollaboratorsLogin.beforeCreate((model, options) => {
    model.uuid = uuidv4();
});
CollaboratorsLogin.sync();
export default CollaboratorsLogin