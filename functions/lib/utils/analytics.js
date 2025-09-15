"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsEvent = void 0;
exports.logEvent = logEvent;
exports.trackContactFormSubmission = trackContactFormSubmission;
exports.trackValidationError = trackValidationError;
exports.trackRateLimitHit = trackRateLimitHit;
const logger_1 = require("./logger");
// Analytics event types
var AnalyticsEvent;
(function (AnalyticsEvent) {
    AnalyticsEvent["CONTACT_FORM_SUBMISSION"] = "contact_form_submission";
    AnalyticsEvent["CONTACT_FORM_ERROR"] = "contact_form_error";
    AnalyticsEvent["RATE_LIMIT_HIT"] = "rate_limit_hit";
    AnalyticsEvent["VALIDATION_ERROR"] = "validation_error";
})(AnalyticsEvent || (exports.AnalyticsEvent = AnalyticsEvent = {}));
/**
 * Log an analytics event with optional parameters
 */
async function logEvent(eventName, params, userId) {
    try {
        // Log the event to Cloud Functions logger for monitoring
        // We can enable Firebase Analytics integration later when needed
        logger_1.logger.info(`Analytics event logged: ${eventName}`, {
            eventName,
            params,
            userId,
            timestamp: Date.now(),
        });
    }
    catch (error) {
        logger_1.logger.error('Failed to log analytics event', {
            eventName,
            params,
            userId,
            error,
        });
    }
}
/**
 * Track contact form submission events
 */
function trackContactFormSubmission(success, params) {
    return logEvent(success ? AnalyticsEvent.CONTACT_FORM_SUBMISSION : AnalyticsEvent.CONTACT_FORM_ERROR, params);
}
/**
 * Track validation errors
 */
function trackValidationError(params) {
    return logEvent(AnalyticsEvent.VALIDATION_ERROR, params);
}
/**
 * Track rate limit hits
 */
function trackRateLimitHit(params) {
    return logEvent(AnalyticsEvent.RATE_LIMIT_HIT, params);
}
//# sourceMappingURL=analytics.js.map