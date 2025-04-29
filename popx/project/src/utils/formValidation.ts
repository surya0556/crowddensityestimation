export const validateEmail = (email: string): string => {
  if (!email) return 'Email is required';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return 'Please enter a valid email address';
  return '';
};

export const validatePassword = (password: string): string => {
  if (!password) return 'Password is required';
  if (password.length < 6) return 'Password must be at least 6 characters';
  return '';
};

export const validateRequired = (value: string, fieldName: string): string => {
  if (!value) return `${fieldName} is required`;
  return '';
};

export const validatePhone = (phone: string): string => {
  if (!phone) return 'Phone number is required';
  const phoneRegex = /^\d{10}$/;
  if (!phoneRegex.test(phone.replace(/\D/g, ''))) 
    return 'Please enter a valid 10-digit phone number';
  return '';
};