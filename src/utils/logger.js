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

const logFormat = printf( ({ level, message, timestamp, stack }) => {
    return `${timestamp} - ${level}: ${stack || message}`
})

const consoleFormat = combine(
    colorize(),
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    logFormat
)

export const logger = createLogger({
    levels: customLevels.levels,
    format: combine(
        format.errors({ stack: true }),
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        logFormat
    ),
    transports: [
        new transports.Console({format: consoleFormat, level: "http"}),
        new transports.File({ filename: "logs/app.log", level: "http"}),
        new transports.File({ filename: "logs/fatal.log", level: "fatal"}),
        new transports.File({ filename: "logs/error.log", level: "error"}),
        new transports.File({ filename: "logs/warn.log", level: "warn"}),
        new transports.File({ filename: "logs/info.log", level: "info"}),
        new transports.File({ filename: "logs/http.log", level: "http"}),
        new transports.File({ filename: "logs/debug.log", level: "debug"}),
    ],
})