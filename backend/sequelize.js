module.exports = {
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: "qrcodebar",
    host: process.env.POSTGRES_HOST,
    dialect: "postgres",
    port: process.env.POSTGRES_PORT
}