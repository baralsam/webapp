import express from 'express';
import { sequelize } from '../services/healthCheckServices.js';
import {validateAndCreateDatabase} from '../services/healthCheckServices.js'

export const createExpressApp = async() => {
  const app = express();
  app.use(express.json());
  await validateAndCreateDatabase();
  await sequelize.sync({alter : true});
  return app;
};

