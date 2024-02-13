import request from 'supertest';
import { createExpressApp } from './utilities/healthCheckUtils.js';
import healthCheckRoutes from './routes/healthCheckRoutes.js';

const app = createExpressApp();
app.use('/', healthCheckRoutes);

describe('Health Check Controller', () => {
  it('should return 200 OK for a successful health check', async () => {
    const response = await request(app).get('/healthz');
    expect(response.status).toBe(200);
    expect(response.header['cache-control']).toBe('no-cache, no-store, must-revalidate');
    expect(response.header.pragma).toBe('no-cache');
    expect(response.header['x-content-type-options']).toBe('nosniff');
    expect(response.body).toEqual({});
  });

  // it('Test should return 503 Service Unavailable for a failed health check', async () => {
  //   jest.spyOn(require('../assignment-1-baralsam/services/healthCheckServices.js').sequelize, 'authenticate').mockRejectedValue(new Error('Database connection error'));
  //   const response = await request(app).get('/healthz');
  //   expect(response.status).toBe(503);
  //   expect(response.header['cache-control']).toBe('no-cache, no-store, must-revalidate');
  //   expect(response.header.pragma).toBe('no-cache');
  //   expect(response.header['x-content-type-options']).toBe('nosniff');
  //   expect(response.body).toEqual({});
  // });

  it('Test should return 400 Bad Request for payload in the request', async () => {
    const response = await request(app).get('/healthz').send({ key: 'value' });
    expect(response.status).toBe(400);
  });

  it('Testshould return 405 Method Not Allowed for non-GET requests', async () => {
    const response = await request(app).post('/healthz');
    expect(response.status).toBe(405);
  });
});

// Reference :  https://jestjs.io/docs/getting-started 