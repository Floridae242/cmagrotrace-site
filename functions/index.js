const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({origin: true});

// Initialize Firebase Admin
admin.initializeApp();

// Contact Form Submission Handler
exports.submitContact = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      if (req.method !== 'POST') {
        return res.status(405).json({
          error: 'Method Not Allowed',
          message: 'Only POST requests are accepted'
        });
      }

      const data = req.body;
      
      // Validate required fields
      const requiredFields = ['name', 'email', 'role', 'province'];
      for (const field of requiredFields) {
        if (!data[field]) {
          return res.status(400).json({
            error: 'Missing Required Field',
            message: `${field} is required`
          });
        }
      }

      // Add timestamp
      const submission = {
        ...data,
        timestamp: admin.firestore.FieldValue.serverTimestamp()
      };

      // Save to Firestore
      await admin.firestore()
        .collection('contact_submissions')
        .add(submission);

      // Success response
      res.status(200).json({
        success: true,
        message: 'Form submitted successfully'
      });

    } catch (error) {
      console.error('Error processing contact form:', error);
      res.status(500).json({
        error: 'Internal Server Error',
        message: 'Failed to process form submission'
      });
    }
  });
});