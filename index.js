import healthCheckRoutes from './routes/healthCheckRoutes.js';
import userRoutes from './routes/userRoutes.js'
import {validateAndCreateDatabase} from './services/healthCheckServices.js'
import { createExpressApp } from './utilities/healthCheckUtils.js';

await validateAndCreateDatabase();
const app = createExpressApp();

app.use('/healthz', healthCheckRoutes);
app.use('/v1/user', userRoutes);
