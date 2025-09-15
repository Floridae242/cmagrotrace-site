"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.LogLevel = void 0;
exports.logRequest = logRequest;
const functions = __importStar(require("firebase-functions"));
// Log levels enum
var LogLevel;
(function (LogLevel) {
    LogLevel["DEBUG"] = "DEBUG";
    LogLevel["INFO"] = "INFO";
    LogLevel["WARN"] = "WARN";
    LogLevel["ERROR"] = "ERROR";
})(LogLevel || (exports.LogLevel = LogLevel = {}));
// Format error objects for logging
function formatError(error) {
    const errorObj = {
        name: error.name,
        message: error.message,
        stack: error.stack,
    };
    // Safely copy any additional properties
    for (const key of Object.keys(error)) {
        if (!(key in errorObj)) {
            errorObj[key] = error[key];
        }
    }
    return errorObj;
}
// Create a formatted log entry
function createLogEntry(level, message, context, error) {
    return Object.assign({ timestamp: new Date().toISOString(), level,
        message,
        context }, (error && { error: formatError(error) }));
}
// Main logging functions
exports.logger = {
    debug: (message, context) => {
        const entry = createLogEntry(LogLevel.DEBUG, message, context);
        functions.logger.debug(entry);
    },
    info: (message, context) => {
        const entry = createLogEntry(LogLevel.INFO, message, context);
        functions.logger.info(entry);
    },
    warn: (message, context, error) => {
        const entry = createLogEntry(LogLevel.WARN, message, context, error);
        functions.logger.warn(entry);
    },
    error: (message, context, error) => {
        const entry = createLogEntry(LogLevel.ERROR, message, context, error);
        functions.logger.error(entry);
    },
};
// Request logging middleware
function logRequest(req, res, next) {
    const start = Date.now();
    // Log request details
    exports.logger.info('Incoming request', {
        method: req.method,
        path: req.path,
        ip: req.ip,
        userAgent: req.get('user-agent'),
    });
    // Log response details
    res.on('finish', () => {
        const duration = Date.now() - start;
        exports.logger.info('Request completed', {
            method: req.method,
            path: req.path,
            statusCode: res.statusCode,
            duration: `${duration}ms`,
        });
    });
    next();
}
//# sourceMappingURL=logger.js.map