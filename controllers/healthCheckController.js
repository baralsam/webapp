import { sequelize } from "../services/healthCheckServices.js";
import logger from "../utilities/logger.js";

export const healthCheckController = async (req, res) => {
  try {
    const contentType = req.headers["content-type"];
    if (contentType) {
      logger.error("Invalid request headers for healthz");
      return res.status(400).send();
    }
    if (Object.keys(req.body).length > 0 || Object.keys(req.query).length > 0) {
      logger.error("Invalid request body for healthz");
      return res.status(400).send();
    }
    await sequelize.authenticate();
    logger.debug("Sequelize Authetication Successful")
    logger.info("Healthz requet Successful");
    res.status(200).send();
  } catch (error) {
    logger.error("Request Error for healthz");
    res.status(503).send();
  }
};
