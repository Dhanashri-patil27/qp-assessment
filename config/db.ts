import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: 5432,
    database: process.env.POSTGRES_DB,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    logging: false,
});

export default sequelize;
