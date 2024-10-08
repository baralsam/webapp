import healthCheckRoutes from './routes/healthCheckRoutes.js';
import userRoutes from './routes/userRoutes.js'
import { createExpressApp } from './utilities/healthCheckUtils.js';
import logger from "./utilities/logger.js";

const app = await createExpressApp();

app.use('/healthz', healthCheckRoutes);
app.use('/v1/user', userRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  logger.info("Server Started");
});
