import { Model, DataTypes } from 'sequelize';
import { sequelize } from "../config/database"
import { v4 as uuidv4 } from 'uuid';

class Company extends Model {
    public uuid!: string
    public cnpj!: string
    public stateRegistration!: number
    public razaoSocial!: boolean
    public nomeFantasia!: string
    public phone!: string
    public email!: string
    public state!: string
    public city!: string
    public neighborhood!: string
    public address!: string
}

Company.init({
    uuid: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    cnpj: {
        type: DataTypes.STRING
    },
    stateRegistration: {
        type: DataTypes.STRING
    },
    razaoSocial: {
        type: DataTypes.STRING
    },
    nomeFantasia: {
        type: DataTypes.STRING
    },
    phone: {
        type: DataTypes.STRING
    },
    state: {
        type: DataTypes.STRING
    },
    city: {
        type: DataTypes.STRING
    },
    neighborhood: {
        type: DataTypes.STRING
    },
    address: {
        type: DataTypes.STRING
    },
    schemaName: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
    modelName: 'Company',
    tableName: "companies",
    timestamps: false,
    schema: 'qrcodebaradmin'
})
Company.beforeCreate((model, options) => {
    model.uuid = uuidv4();
});
Company.sync();
export default Company