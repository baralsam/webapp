import winston from 'winston';
import { createLogger, format, transports } from 'winston';

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf(({ level, message, timestamp }) => {
            return JSON.stringify({
                severity: level.toUpperCase(),
                message,
                timestamp
            });
        })
    ),
    transports: [
        new winston.transports.File({
            filename: './var/logs/csye6225.log', 
        }),
        new winston.transports.Console()
    ]
});

export default logger;
