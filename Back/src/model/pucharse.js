import { DataTypes } from "sequelize"
import { sequelize } from '../db.js'
import { FunctionCinema } from "./function.js";
import { User } from "./user.js";


export const Purchase = sequelize.define('purchase',{
    "id": { 
        type: DataTypes.INTEGER, 
        primaryKey:true, 
        autoIncrement:true},
    "purchase_date": {
        type: DataTypes.DATE,
        allowNull: false,
    },
    "amount": {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: User,
          key: 'id'
        }
      },
    function_id: {
        type: DataTypes.INTEGER,
        references: {
          model: FunctionCinema,
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
