import { sequelize } from '../services/healthCheckServices.js';

export const healthCheckController = async (req, res) => {
  try {
    if(req.method !== 'GET'){
      res.status(405).send();
    }
    const contentType = req.headers['content-type'];
if(contentType ) { 
        return res.status(400).send();
      }
    if(Object.keys(req.body).length > 0 || Object.keys(req.query).length > 0){   
        return res.status(400).send();
    }
    await sequelize.authenticate();
    console.log('Sequelize Connection Succesful');
    res.status(200).send();
  } catch (error) {
    console.error('Sequelize Connection Error');
    res.status(503).send();
  }
};

