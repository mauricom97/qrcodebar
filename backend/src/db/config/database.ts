import { Sequelize } from "sequelize-typescript";

export const sequelize = new Sequelize({
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: "qrcodebar",
    host: process.env.POSTGRES_HOST,
    dialect: "postgres",
    port: 5432
})