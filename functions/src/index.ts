import * as admin from 'firebase-admin';
import { handleContactForm } from './handlers/contact';

// Initialize Firebase Admin
admin.initializeApp();

// Export the Cloud Functions
export const contactForm = handleContactForm;