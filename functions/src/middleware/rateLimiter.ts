import * as functions from 'firebase-functions';
import rateLimit from 'express-rate-limit';

// Configure rate limiting options
const rateLimitConfig = {
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 5, // limit each IP to 5 requests per windowMs
  message: {
    status: 'error',
    message: 'Too many requests from this IP, please try again after an hour',
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
};

// Create the rate limiter middleware
export const rateLimiter = rateLimit(rateLimitConfig);

// Helper function to wrap rate limiter for Firebase Functions
export const applyRateLimit = (handler: functions.HttpsFunction) => {
  return functions.https.onRequest((req, res) => {
    // Apply rate limiting
    rateLimiter(req, res, () => {
      return handler(req, res);
    });
  });
};

// Helper function to check if request is rate limited
export const isRateLimited = (req: functions.https.Request): boolean => {
  // Get remaining requests from header
  const rateLimitState = req.get('X-RateLimit-Remaining');
  const remaining = rateLimitState ? parseInt(rateLimitState, 10) : rateLimitConfig.max;
  
  return remaining <= 0;
};