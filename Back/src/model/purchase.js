import { DataTypes } from "sequelize"
import { sequelize } from '../db.js'

export const Purchase = sequelize.define('purchase',{
    'id': { 
        type: DataTypes.INTEGER, 
        primaryKey:true, 
        autoIncrement:true},
    'purchase_date': {
        type: DataTypes.DATE,
        allowNull: false,
    },
    'amount': {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    'user_id': {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }
      },
    'function_id': {
        type: DataTypes.INTEGER,
        references: {
          model: 'function_cinema',
          key: 'id'
        }
      }
    }, {
      tableName: 'purchase',
      timestamps: false
    });
  
    Purchase.associate = (models) => {
      Purchase.belongsTo(models.User, { foreignKey: 'user_id' });
      Purchase.belongsTo(models.FunctionCinema, { foreignKey: 'function_id' });
    }; 
