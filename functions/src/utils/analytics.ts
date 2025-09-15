import { logger } from './logger';

// Analytics event types
export enum AnalyticsEvent {
  CONTACT_FORM_SUBMISSION = 'contact_form_submission',
  CONTACT_FORM_ERROR = 'contact_form_error',
  RATE_LIMIT_HIT = 'rate_limit_hit',
  VALIDATION_ERROR = 'validation_error',
}

// Analytics parameters interface
export interface AnalyticsParams {
  [key: string]: string | number | boolean | null;
}

/**
 * Log an analytics event with optional parameters
 */
export async function logEvent(
  eventName: AnalyticsEvent,
  params?: AnalyticsParams,
  userId?: string
): Promise<void> {
  try {
    // Log the event to Cloud Functions logger for monitoring
    // We can enable Firebase Analytics integration later when needed
    logger.info(`Analytics event logged: ${eventName}`, {
      eventName,
      params,
      userId,
      timestamp: Date.now(),
    });
  } catch (error) {
    logger.error('Failed to log analytics event', {
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
export function trackContactFormSubmission(
  success: boolean,
  params: AnalyticsParams
): Promise<void> {
  return logEvent(
    success ? AnalyticsEvent.CONTACT_FORM_SUBMISSION : AnalyticsEvent.CONTACT_FORM_ERROR,
    params
  );
}

/**
 * Track validation errors
 */
export function trackValidationError(params: AnalyticsParams): Promise<void> {
  return logEvent(AnalyticsEvent.VALIDATION_ERROR, params);
}

/**
 * Track rate limit hits
 */
export function trackRateLimitHit(params: AnalyticsParams): Promise<void> {
  return logEvent(AnalyticsEvent.RATE_LIMIT_HIT, params);
}