import { createExpressApp } from './utilities/healthCheckUtils.js';
import healthCheckRoutes from './routes/healthCheckRoutes.js';
import userRoutes from './routes/userRoutes.js'

const app = createExpressApp();

app.use('/healthz', healthCheckRoutes);
app.use('/v1/user', userRoutes);
