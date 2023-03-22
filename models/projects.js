'use strict';
const { v4: uuidv4 } = require('uuid')
module.exports = (sequelize, DataTypes) => {
    const Project = sequelize.define('Project', {
      uuid: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: uuidv4
      },
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      dateStart: DataTypes.DATEONLY,
      dateEnd: DataTypes.DATEONLY,
      valueHour: DataTypes.DECIMAL,
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
    }, {
        timestamps: true,
        tableName: 'projects',
        freezeTableName: true,
    })
    

    return Project;
};