import request from 'supertest';
import { createExpressApp } from './utilities/healthCheckUtils.js';
import userRoutes from './routes/userRoutes.js';
import { sequelize } from './services/healthCheckServices.js';

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
  app.use('/v1/user', userRoutes);
});

describe('/v1/user Integration Tests', () => {

  it('Test 1: Create an account and validate account exists', async () => {
    const response = await request(app)
      .post('/v1/user')
      .send({
        "email": "sam@gmail.com",
        "password": "password123",
        "firstName": "Samiksha",
        "lastName": "Baral"
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');

    const userId = response.body.id;
    const getUserResponse = await request(app)
      .get(`/v1/user/self`)
      .auth('sam@gmail.com', 'password123');

    expect(getUserResponse.status).toBe(200);
    expect(getUserResponse.body.id).toBe(userId);
  });

  it('Test 2: Update the account and validate the account was updated', async () => {
      const updateResponse = await request(app)
      .put(`/v1/user/self`)
      .auth('sam@gmail.com', 'password123')
      .send({
        firstName: 'UpdatedFirstName',
        lastName: 'UpdatedLastName',
      });

    expect(updateResponse.status).toBe(204);

    const getUserResponse = await request(app)
      .get(`/v1/user/self`)
      .auth('sam@gmail.com', 'password123');

    expect(getUserResponse.status).toBe(200);
    expect(getUserResponse.body.firstName).toBe('UpdatedFirstName');
    expect(getUserResponse.body.lastName).toBe('UpdatedLastName');
  });
});
