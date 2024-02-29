import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import mysql2 from 'mysql2/promise';

dotenv.config();

export async function validateAndCreateDatabase() {
  try {
    const connection =  mysql2.createPool({
      host: process.env.DBURL,
      user: process.env.DBUSER,
      password: process.env.DBPASSWORD,
    });
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DBNAME}`);
    await connection.end();
  } catch (error) {
    console.error(error);
  }
}

export const sequelize = new Sequelize(process.env.DBNAME, process.env.DBUSER, process.env.DBPASSWORD, {
  host: process.env.DBURL,
  dialect: 'mysql'
});

