import { Sequelize } from "sequelize"

export const sequelize = new Sequelize('tpi_integrador','root','admin',{
    host:'localhost',
    dialect:'mysql'
})
