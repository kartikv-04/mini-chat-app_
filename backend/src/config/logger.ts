import pino from 'pino';
import { LOG_LEVEL } from './env.js';

const  logger = pino({
    level : LOG_LEVEL || 'info',
    transport : {
        target : 'pino-pretty',
        options : {
            colorize : true,
            translatetime : "yyyy-mm-dd HH-MM-ss",
            ignore : "pid, hostname"
        }
    }
})
export default logger;