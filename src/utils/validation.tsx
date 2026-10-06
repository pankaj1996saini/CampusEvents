import { RegistrationInput } from '../types';

export type FormErrors = Partial<Record<keyof RegistrationInput, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MOBILE_REGEX = /^[6-9]\d{9}$/; // 10 digit Indian mobile number

export function validateForm(form: Omit<RegistrationInput, 'eventId'>): FormErrors {
  const errors: FormErrors = {};

  if (!form.studentName.trim()) {
    errors.studentName = 'Student name is required';
  } else if (form.studentName.trim().length < 3) {
    errors.studentName = 'Name must be at least 3 characters';
  }

  if (!form.rollNumber.trim()) errors.rollNumber = 'Roll number is required';

  if (!form.email.trim()) {
    errors.email = 'Email is required';
  } else if (!EMAIL_REGEX.test(form.email.trim())) {
    errors.email = 'Enter a valid email address';
  }

  if (!form.mobile.trim()) {
    errors.mobile = 'Mobile number is required';
  } else if (!MOBILE_REGEX.test(form.mobile.trim())) {
    errors.mobile = 'Enter a valid 10-digit mobile number';
  }

  if (!form.department.trim()) errors.department = 'Department is required';
  if (!form.year) errors.year = 'Please select your year';

  return errors;
}
