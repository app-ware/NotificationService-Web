import type { Params } from 'nestjs-pino';
import pino from 'pino';

const isProduction = process.env.NODE_ENV === 'production';

/**
 * Raw JSON in production, pino-pretty in development. HTTP auto-logging is off: the only
 * HTTP route is /health (polled by docker), the real work arrives over RabbitMQ and every
 * handler logs its own jobId-tagged summary.
 */
export const loggerConfig: Params = {
  pinoHttp: {
    level: isProduction ? 'info' : 'debug',
    autoLogging: false,
    transport: isProduction
      ? undefined
      : {
          target: 'pino-pretty',
          options: {
            colorize: true,
            levelFirst: true,
            translateTime: 'SYS:yyyy-mm-dd HH:MM:ss',
            ignore: 'pid,hostname,req',
          },
        },
    serializers: { err: pino.stdSerializers.err },
  },
};
