import { logger } from "../utils/logger.js";

export const errorHandler = (err, _req, res, _next) => {
    const statusCode = err.status ?? 500;
    const errorMessage = err.message ?? "Internal server error";

    logger.error(errorMessage);

    res.status(statusCode).json({
        error: {
            message: errorMessage,
            status: statusCode,
        },
    });
};