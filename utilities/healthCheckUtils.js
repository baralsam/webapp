import express from 'express';
import { sequelize } from '../services/healthCheckServices.js';

export const createExpressApp = () => {
  const app = express();
  app.use(express.json());
  sequelize.sync({alter : true});
  const PORT = 3001;
  app.listen(PORT, () => {
    console.log(`Server Started`);
  });
  return app;
};
