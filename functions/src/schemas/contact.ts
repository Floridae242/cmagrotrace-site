import { z } from 'zod';

// Email regex pattern for validation
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Contact form schema with detailed validation and error messages
export const contactFormSchema = z.object({
  firstName: z
    .string()
    .min(2, 'First name must be at least 2 characters long')
    .max(50, 'First name must be less than 50 characters')
    .regex(/^[a-zA-Z\s-]+$/, 'First name can only contain letters, spaces, and hyphens')
    .trim(),
    
  lastName: z
    .string()
    .min(2, 'Last name must be at least 2 characters long')
    .max(50, 'Last name must be less than 50 characters')
    .regex(/^[a-zA-Z\s-]+$/, 'Last name can only contain letters, spaces, and hyphens')
    .trim(),
    
  email: z
    .string()
    .email('Please enter a valid email address')
    .regex(EMAIL_REGEX, 'Please enter a valid email address')
    .trim()
    .toLowerCase(),
    
  company: z
    .string()
    .min(2, 'Company name must be at least 2 characters long')
    .max(100, 'Company name must be less than 100 characters')
    .trim(),
    
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters long')
    .max(1000, 'Message must be less than 1000 characters')
    .trim(),
    
  phone: z
    .string()
    .regex(/^\+?[\d\s-()]{10,20}$/, 'Please enter a valid phone number')
    .optional(),
    
  industry: z
    .string()
    .min(2, 'Industry must be at least 2 characters long')
    .max(100, 'Industry must be less than 100 characters')
    .optional(),
});

// Type for the validated contact form data
export type ContactFormData = z.infer<typeof contactFormSchema>;

// Custom error type for validation failures
export interface ValidationError {
  field: string;
  message: string;
}

// Helper function to format validation errors
export function formatValidationErrors(error: z.ZodError): ValidationError[] {
  return error.issues.map((issue) => ({
    field: issue.path.join('.'),
    message: issue.message,
  }));
}