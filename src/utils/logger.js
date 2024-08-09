import { createLogger, transports, format, addColors } from 'winston';

const { printf, combine, colorize, timestamp } = format;

const customLevels = {
    levels: {
        fatal: 0,
        error: 1,
        warn: 2,
        info: 3,
        http: 4,
        debug: 5
    },
    colors: {
        fatal: 'red',
        error: 'red',
        warn: 'yellow',
        info: 'blue',
        http: 'magenta',
        debug: 'white',
    }
}

addColors(customLevels.colors);

const logFormat = printf( ({ level, message, timestamp }) => {
    return `${timestamp} - ${level}: ${message}`
})

const consoleFormat = combine(
    colorize(),
    timestamp( {format: 'YYYY-MM-DD HH:mm:ss'} ),
    logFormat
)

export const logger = createLogger({
    levels: customLevels.levels,
    format: consoleFormat,
    transports: [
        new transports.Console(),
        new transports.File({ filename: "logs/app.logs" }),
        new transports.File({ filename: "logs/fatal.logs", level: "fatal" }),
        new transports.File({ filename: "logs/error.logs", level: "error" }),
        new transports.File({ filename: "logs/warn.logs", level: "warn" }),
        new transports.File({ filename: "logs/info.logs", level: "info" }),
        new transports.File({ filename: "logs/http.logs", level: "http" }),
        new transports.File({ filename: "logs/debug.logs", level: "debug" }),
    ]
})