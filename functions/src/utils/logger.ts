import * as functions from 'firebase-functions';

// Log levels enum
export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

// Interface for structured log entries
interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: Record<string, unknown>;
  error?: Error;
}

// Format error objects for logging
function formatError(error: Error): Error & Record<string, unknown> {
  const errorObj = {
    name: error.name,
    message: error.message,
    stack: error.stack,
  };
  
  // Safely copy any additional properties
  for (const key of Object.keys(error)) {
    if (!(key in errorObj)) {
      (errorObj as Record<string, unknown>)[key] = (error as unknown as Record<string, unknown>)[key];
    }
  }
  
  return errorObj as Error & Record<string, unknown>;
}

// Create a formatted log entry
function createLogEntry(
  level: LogLevel,
  message: string,
  context?: Record<string, unknown>,
  error?: Error
): LogEntry {
  return {
    timestamp: new Date().toISOString(),
    level,
    message,
    context,
    ...(error && { error: formatError(error) }),
  };
}

// Main logging functions
export const logger = {
  debug: (message: string, context?: Record<string, unknown>) => {
    const entry = createLogEntry(LogLevel.DEBUG, message, context);
    functions.logger.debug(entry);
  },

  info: (message: string, context?: Record<string, unknown>) => {
    const entry = createLogEntry(LogLevel.INFO, message, context);
    functions.logger.info(entry);
  },

  warn: (message: string, context?: Record<string, unknown>, error?: Error) => {
    const entry = createLogEntry(LogLevel.WARN, message, context, error);
    functions.logger.warn(entry);
  },

  error: (message: string, context?: Record<string, unknown>, error?: Error) => {
    const entry = createLogEntry(LogLevel.ERROR, message, context, error);
    functions.logger.error(entry);
  },
};

// Request logging middleware
export function logRequest(req: functions.https.Request, res: functions.Response, next: () => void) {
  const start = Date.now();
  
  // Log request details
  logger.info('Incoming request', {
    method: req.method,
    path: req.path,
    ip: req.ip,
    userAgent: req.get('user-agent'),
  });

  // Log response details
  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info('Request completed', {
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
    });
  });

  next();
}