const { Sequelize } = require("sequelize-typescript");
const dotenv = require('dotenv');
dotenv.config();

const username = process.env.POSTGRES_USERNAME;
const password = process.env.POSTGRES_PASSWORD;
const database = process.env.POSTGRES_DATABASE;
const host = process.env.POSTGRES_HOST;
const port = process.env.POSTGRES_PORT;

module.exports = new Sequelize({
    username: username,
    password: password,
    database: database,
    host: host,
    dialect: 'postgres',
    port: parseInt(port),
});