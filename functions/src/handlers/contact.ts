import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import cors from 'cors';
import { contactFormSchema, formatValidationErrors } from '../schemas/contact';
import { logger, logRequest } from '../utils/logger';
import { isRateLimited } from '../middleware/rateLimiter';
import { trackContactFormSubmission, trackValidationError, trackRateLimitHit } from '../utils/analytics';

// Initialize CORS middleware
const corsHandler = cors({ origin: true });

// Create handler for contact form submissions
export const handleContactForm = functions.https.onRequest(async (req, res) => {
  // Apply CORS
  corsHandler(req, res, async () => {
    try {
      // Log incoming request
      logRequest(req, res, () => {});

      // Check rate limiting
      if (isRateLimited(req)) {
        await trackRateLimitHit({
          ipHash: Buffer.from(req.ip || 'unknown').toString('base64'),
          userAgentHash: Buffer.from(req.get('user-agent') || 'unknown').toString('base64'),
        });
        
        return res.status(429).json({
          status: 'error',
          message: 'Too many requests, please try again later',
        });
      }

      // Validate request method
      if (req.method !== 'POST') {
        logger.warn('Invalid request method', { method: req.method });
        return res.status(405).json({
          status: 'error',
          message: 'Method not allowed',
        });
      }

      // Validate request body
      const validationResult = contactFormSchema.safeParse(req.body);

      if (!validationResult.success) {
        const errors = formatValidationErrors(validationResult.error);
        
        await trackValidationError({
          errors: errors.map(e => `${e.field}: ${e.message}`).join(', '),
        });

        logger.warn('Validation failed', { errors });
        
        return res.status(400).json({
          status: 'error',
          message: 'Validation failed',
          errors,
        });
      }

      const formData = validationResult.data;

      // Store the submission in Firestore
      const db = admin.firestore();
      const submission = {
        ...formData,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        status: 'new',
      };

      await db.collection('contact-submissions').add(submission);

      // Log analytics event for successful submission
      await trackContactFormSubmission(true, {
        email: formData.email,
        company: formData.company,
        hasPhone: !!formData.phone,
        hasIndustry: !!formData.industry,
      });

      // Send success response
      logger.info('Contact form submission successful', {
        email: formData.email,
        company: formData.company,
      });

      return res.status(200).json({
        status: 'success',
        message: 'Form submitted successfully',
      });

    } catch (error) {
      // Log error details
      logger.error('Error processing contact form', {
        error,
        body: req.body,
      });

      // Track error in analytics
      await trackContactFormSubmission(false, {
        error: error instanceof Error ? error.message : 'Unknown error',
      });

      // Send error response
      return res.status(500).json({
        status: 'error',
        message: 'Internal server error',
      });
    }
  });
});