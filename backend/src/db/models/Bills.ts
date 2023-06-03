import { Model, DataTypes } from 'sequelize';
import { sequelize } from "../config/database"
import { v4 as uuidv4 } from 'uuid';

class Bill extends Model {
    public uuid!: string
    public code!: number
    public uuid_item!: string
    public quantity!: number
    public company_uuid!: string
}

Bill.init(
    {
      uuid: {
        type: DataTypes.UUID, // <- Altere para UUID
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      code: {
        type: DataTypes.INTEGER,
      },
      uuid_item: {
        type: DataTypes.UUID,
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
    },
    {
      sequelize,
      modelName: 'Bill',
      tableName: 'bills',
      timestamps: false,
      schema: 'public'
    }
  );
  Bill.beforeCreate((model, options) => {
    model.uuid = uuidv4();
});

  export default Bill;