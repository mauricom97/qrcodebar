import { Sequelize } from "sequelize-typescript";

export const sequelize = new Sequelize({
    username: 'postgres',
    password: 'root',
    database: "qrcodebar",
    host: 'localhost',
    dialect: "postgres",
    port: 5432
})