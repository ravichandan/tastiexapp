// utils/logger.ts
/* eslint-disable no-console */

const isProduction = process.env.APP_ENV === 'production';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

function log(level: LogLevel, ...args: unknown[]) {
  if (isProduction && level === 'debug') {
    return; // completely remove debug logs in production
  }

  switch (level) {
    case 'debug':
      console.debug('[DEBUG]', ...args);
      break;
    case 'info':
      console.info('[INFO]', ...args);
      break;
    case 'warn':
      console.warn('[WARN]', ...args);
      break;
    case 'error':
      console.error('[ERROR]', ...args);
      break;
  }
}

export const logger = {
  debug: (...args: unknown[]) => log('debug', ...args),
  info: (...args: unknown[]) => log('info', ...args),
  warn: (...args: unknown[]) => log('warn', ...args),
  error: (...args: unknown[]) => log('error', ...args),
};
