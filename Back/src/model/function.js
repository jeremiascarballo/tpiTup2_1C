import { DataTypes } from "sequelize"
import { sequelize } from '../db.js'


export const FunctionCinema = sequelize.define('function_cinema',{
    "id": { 
        type: DataTypes.INTEGER, 
        primaryKey:true, 
        autoIncrement:true},
    "date": {
        type: DataTypes.DATE,
        allowNull: false,
    },
    "total_seats": {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    "available_seats": {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    movie_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'movies',
          key: 'id'
        }
      }
    }, {
      tableName: 'function_cinema',
      timestamps: false
    });
  
    FunctionCinema.associate = (models) => {
      FunctionCinema.belongsTo(models.Movie, { foreignKey: 'movie_id' });
    };  