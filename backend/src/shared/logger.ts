import * as _ from 'lodash';
import * as winston from 'winston';
import * as util from 'util';
import { Request } from 'express';

const ERROR_STASHES: string[] = [];
let ERROR_SENDING_INTERVAL: number;
if (process.env.ERROR_SENDING_INTERVAL) {
  ERROR_SENDING_INTERVAL = parseInt(process.env.ERROR_SENDING_INTERVAL, 10);
}

// Default interval is 15 minutes
if (!ERROR_SENDING_INTERVAL || isNaN(ERROR_SENDING_INTERVAL)) {
  ERROR_SENDING_INTERVAL = 15 * 60 * 1000;
}

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    return Object.assign(
      {
        message: info.message,
        stack: info.stack,
      },
      info,
    );
  }
  return info;
});

export function getLogger(name: string) {
  const has = winston.loggers.has(name);
  if (!has) {
    const transports: any[] = [];
    transports.push(
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
          winston.format.printf((info) => {
            const { timestamp, level, message, ...extra } = info;
            return `${timestamp} [${name}][${level}]: ${message} ${
              Object.keys(extra).length ? util.inspect(extra) : ''
            }`;
          }),
        ),
        stderrLevels: ['error'],
      }),
    );

    winston.loggers.add(name, {
      level: process.env.LOG_LEVEL || 'debug',
      format: winston.format.combine(enumerateErrorFormat()),
      transports,
    });
  }

  return {
    debug(msg: any) {
      return winston.loggers.get(name).debug(msg);
    },
    info(msg: any) {
      return winston.loggers.get(name).info(msg);
    },
    warn(msg: any) {
      return winston.loggers.get(name).warn(msg);
    },
    error(msg: any) {
      ERROR_STASHES.push(`[ERROR] ${msg}`);
      return winston.loggers.get(name).error(msg);
    },
    fatal(msg: any) {
      ERROR_STASHES.push(`[ERROR] ${msg}`);
      return winston.loggers.get(name).error(msg);
    },
    async notifyErrorsImmediately() {
      try {

      } catch (err) {
        console.error(`======= UNCAUGHT ERROR NOTIFYING BEGIN =======`);
        console.error(err);
        console.error(`======= UNCAUGHT ERROR NOTIFYING END =======`);
      }
    },
  };
}

export function logger(req: Request, res: any, next: any) {
  const log = getLogger('BaseLogger');
  log.debug(`${req.method} ${req.url}`);
  next();
}

export function debugLog(log: any) {
  // TODO: implement me
  console.log(log);
}

export function errorLog(log: any) {
  // TODO: implement me
  console.error(log);
}
