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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleContactForm = void 0;
const functions = __importStar(require("firebase-functions"));
const admin = __importStar(require("firebase-admin"));
const cors_1 = __importDefault(require("cors"));
const contact_1 = require("../schemas/contact");
const logger_1 = require("../utils/logger");
const rateLimiter_1 = require("../middleware/rateLimiter");
const analytics_1 = require("../utils/analytics");
// Initialize CORS middleware
const corsHandler = (0, cors_1.default)({ origin: true });
// Create handler for contact form submissions
exports.handleContactForm = functions.https.onRequest(async (req, res) => {
    // Apply CORS
    corsHandler(req, res, async () => {
        try {
            // Log incoming request
            (0, logger_1.logRequest)(req, res, () => { });
            // Check rate limiting
            if ((0, rateLimiter_1.isRateLimited)(req)) {
                await (0, analytics_1.trackRateLimitHit)({
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
                logger_1.logger.warn('Invalid request method', { method: req.method });
                return res.status(405).json({
                    status: 'error',
                    message: 'Method not allowed',
                });
            }
            // Validate request body
            const validationResult = contact_1.contactFormSchema.safeParse(req.body);
            if (!validationResult.success) {
                const errors = (0, contact_1.formatValidationErrors)(validationResult.error);
                await (0, analytics_1.trackValidationError)({
                    errors: errors.map(e => `${e.field}: ${e.message}`).join(', '),
                });
                logger_1.logger.warn('Validation failed', { errors });
                return res.status(400).json({
                    status: 'error',
                    message: 'Validation failed',
                    errors,
                });
            }
            const formData = validationResult.data;
            // Store the submission in Firestore
            const db = admin.firestore();
            const submission = Object.assign(Object.assign({}, formData), { timestamp: admin.firestore.FieldValue.serverTimestamp(), status: 'new' });
            await db.collection('contact-submissions').add(submission);
            // Log analytics event for successful submission
            await (0, analytics_1.trackContactFormSubmission)(true, {
                email: formData.email,
                company: formData.company,
                hasPhone: !!formData.phone,
                hasIndustry: !!formData.industry,
            });
            // Send success response
            logger_1.logger.info('Contact form submission successful', {
                email: formData.email,
                company: formData.company,
            });
            return res.status(200).json({
                status: 'success',
                message: 'Form submitted successfully',
            });
        }
        catch (error) {
            // Log error details
            logger_1.logger.error('Error processing contact form', {
                error,
                body: req.body,
            });
            // Track error in analytics
            await (0, analytics_1.trackContactFormSubmission)(false, {
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
//# sourceMappingURL=contact.js.map