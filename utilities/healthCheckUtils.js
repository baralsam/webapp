import express from 'express';
import { sequelize } from '../services/healthCheckServices.js';

export const createExpressApp = () => {
  const app = express();
  app.use(express.json());
  sequelize.sync({alter : true});
  return app;
};

