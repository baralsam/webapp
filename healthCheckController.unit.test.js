import request from 'supertest';
import { createExpressApp } from './utilities/healthCheckUtils.js';
import healthCheckRoutes from './routes/healthCheckRoutes.js';

jest.mock('./utilities/logger.js', () => {
  return {
    error: jest.fn(),
    warn: jest.fn(),
    info: jest.fn(),
    debug: jest.fn()
  };
});
let app;


beforeAll(async () => {
  app = await createExpressApp();
  app.use('/healthz', healthCheckRoutes);
});


describe('Health Check Controller', () => {
  it('should return 200 OK for a successful health check', async () => {
    const response = await request(app).get('/healthz');
    expect(response.status).toBe(200);
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