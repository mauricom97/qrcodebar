import { Model, DataTypes } from 'sequelize';
import { sequelize } from "../config/database"
import { v4 as uuidv4 } from 'uuid';
import Item from './Item';
class Bill extends Model {
    public uuid!: string
    public code!: number
    public uuid_item!: string
    public quantity!: number
    public company_uuid!: string
    public status!: number // Adicione essa propriedade

    // Adicione as seguintes propriedades
    public descriptionBill!: string
    public hourBill!: string
}

Bill.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      code: {
        type: DataTypes.INTEGER,
      },
      uuid_item: {
        type: DataTypes.UUID,
        references: {
          model: Item,
          key: 'uuid'
        }
      },
      quantity: {
        type: DataTypes.INTEGER,
      },
      status: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      uuid_table: {
        type: DataTypes.UUID,
      },
      company_uuid: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      descriptionBill: {
        type: DataTypes.STRING, // Defina o tipo apropriado para a descrição da fatura
      },
      createdAt: {
        type: DataTypes.STRING, // Defina o tipo apropriado para a hora da fatura
        defaultValue: new Date().toISOString()
      },
    },
    {
      sequelize,
      modelName: 'Bill',
      tableName: 'bills',
      timestamps: false,
      schema: 'public'
    }
);

Bill.belongsTo(Item, { foreignKey: 'uuid_item', as: 'item' });


Bill.beforeCreate((model, options) => {
    model.uuid = uuidv4();
});

export default Bill;
