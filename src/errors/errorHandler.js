import { logger } from "../utils/logger.js";

export const errorHandler = (err, _req, res, _next) => {
    const status = err.status || 500;
    const message = status === 500 ? 'Internal Server Error' : err.message;

    if (status === 500) {  
        logger.log('error', err.message);
    }

    res.status(status).json({
        error: {
            message, 
            status
        }
    });
};
