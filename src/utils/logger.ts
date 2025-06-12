/* eslint-disable no-console, no-unused-vars */
/**
 * Enkel logger-wrapper.
 * Byt ut console.* mot valfri logg-tjänst (t.ex. Sentry) vid behov.
 */
const isBrowser = typeof window !== 'undefined';

export function logInfo(message: string, ...args: any[]) {
  if (process.env.NODE_ENV === 'development') {
    console.info(`[INFO] ${message}`, ...args);
  }
}

export function logWarn(message: string, ...args: any[]) {
  console.warn(`[WARN] ${message}`, ...args);
}

export function logError(message: string | Error, ...args: any[]) {
  // Skicka även till extern service här om så önskas
  if (message instanceof Error) {
    console.error(`[ERROR] ${message.message}`, message.stack, ...args);
  } else {
    console.error(`[ERROR] ${message}`, ...args);
  }
}

export default { logInfo, logWarn, logError };
