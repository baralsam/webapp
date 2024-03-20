import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import mysql2 from 'mysql2/promise';
import logger from "../utilities/logger.js";

dotenv.config();

export async function validateAndCreateDatabase() {
  try {
    const connection =  mysql2.createPool({
      host: process.env.DBURL,
      user: process.env.DBUSER,
      password: process.env.DBPASSWORD,
    });
    logger.warn("Database is not present");
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DBNAME}`);
    logger.info("Database created successfully");
    await connection.end();
  } catch (error) {
    logger.error("Error while creating database");
  }
}

export const sequelize = new Sequelize(process.env.DBNAME, process.env.DBUSER, process.env.DBPASSWORD, {
  host: process.env.DBURL,
  dialect: 'mysql'
});

