import { DataTypes } from "sequelize"
import { sequelize } from '../db.js'


export const movie = sequelize.define('movie',{
    "id": { 
        type: DataTypes.INTEGER, 
        primaryKey:true, 
        autoIncrement:true},
    "title": {
        type: DataTypes.STRING,
        allowNull: false,
    },
    "origin": {
        type: DataTypes.STRING,
        allowNull: false,
    },
    "director": {
        type: DataTypes.STRING,
        allowNull: false,
    },
    "qualification": {
        type: DataTypes.STRING,
        allowNull: false,
    },
    "duration": {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    "img": {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    "description": {
        type: DataTypes.TEXT,
        allowNull: false,
    }
}, {
    timestamps: false
});