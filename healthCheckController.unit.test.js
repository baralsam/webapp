import request from 'supertest';
import { createExpressApp } from './utilities/healthCheckUtils.js';
import healthCheckRoutes from './routes/healthCheckRoutes.js';

let app;


beforeAll(async () => {
  app = await createExpressApp();
  app.use('/', healthCheckRoutes);
});


describe('Health Check Controller', () => {
  it('should return 200 OK for a successful health check', async () => {
    const response = await request(app).get('/healthz');
    expect(response.status).toBe(200);
    expect(response.header['cache-control']).toBe('no-cache, no-store, must-revalidate');
    expect(response.header.pragma).toBe('no-cache');
    expect(response.header['x-content-type-options']).toBe('nosniff');
    expect(response.body).toEqual({});
  });

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