import React from 'react';

export type ValidationError = {
  field: string;
  message: string;
};

export type ContactFormData = {
  name: string;
  email: string;
  role: string;
  province: string;
  organization?: string;
  volume?: string;
  message?: string;
};

export function validateContactForm(data: Record<string, any>): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!data.name?.trim()) {
    errors.push({ field: 'name', message: 'Name is required' });
  } else if (data.name.length < 2) {
    errors.push({ field: 'name', message: 'Name must be at least 2 characters' });
  }

  if (!data.email?.trim()) {
    errors.push({ field: 'email', message: 'Email is required' });
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push({ field: 'email', message: 'Please enter a valid email address' });
  }

  if (!data.role) {
    errors.push({ field: 'role', message: 'Please select your role' });
  }

  if (!data.province) {
    errors.push({ field: 'province', message: 'Please select your province' });
  }

  if (data.volume && !/^\d+$/.test(data.volume)) {
    errors.push({ field: 'volume', message: 'Volume must be a number' });
  }

  if (data.message?.length > 1000) {
    errors.push({ field: 'message', message: 'Message must be less than 1000 characters' });
  }

  return errors;
}