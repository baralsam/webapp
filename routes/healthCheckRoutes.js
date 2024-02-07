import express from 'express';
import { healthCheckController } from '../controllers/healthCheckController.js';

const router = express.Router();

router.use('/healthz', (req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    next();
  });

  router.route('/healthz')
  .get(healthCheckController)
  .all((req, res) => {
    res.status(405).send();
  });

  router
  .route('*')
  .all((req, res) => {
    res.status(404).send();
  });

export default router;
