import { NextApiRequest, NextApiResponse } from 'next';
import { createContact } from '../../lib/db';
import { validateContactForm } from '../../lib/validation';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const validationErrors = validateContactForm(req.body);
  if (validationErrors.length > 0) {
    return res.status(400).json({ errors: validationErrors });
  }

  try {
    const contact = await createContact(req.body);
    res.status(201).json({ success: true, data: contact });
  } catch (error: any) {
    console.error('Failed to create contact:', error);
    res.status(500).json({ 
      error: 'Failed to save contact information',
      detail: error.message 
    });
  }
}