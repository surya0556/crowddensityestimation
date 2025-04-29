import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import InputField from '../components/InputField';
import RadioButton from '../components/RadioButton';
import { registerUser, isAuthenticated } from '../utils/auth';
import { 
  validateEmail, 
  validatePassword, 
  validateRequired,
  validatePhone
} from '../utils/formValidation';
import { ArrowLeft } from 'lucide-react';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [isAgency, setIsAgency] = useState(false);
  const [errors, setErrors] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    password: '',
    companyName: '',
    general: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/profile');
    }
  }, [navigate]);

  const validateForm = (): boolean => {
    const nameError = validateRequired(fullName, 'Full Name');
    const phoneError = validatePhone(phoneNumber);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    
    setErrors({
      fullName: nameError,
      phoneNumber: phoneError,
      email: emailError,
      password: passwordError,
      companyName: '',
      general: ''
    });
    
    return !nameError && !phoneError && !emailError && !passwordError;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        registerUser({
          fullName,
          phoneNumber,
          email,
          password,
          companyName,
          isAgency
        });
        
        // Redirect to login page after successful registration
        navigate('/login');
      } catch (error) {
        setErrors(prev => ({
          ...prev,
          general: 'An error occurred during registration. Please try again.'
        }));
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleAgencyChange = (value: string) => {
    setIsAgency(value === 'yes');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8 animate-fadeIn">
        <button 
          onClick={() => navigate('/')} 
          className="mb-6 text-gray-600 flex items-center hover:text-purple-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>Back</span>
        </button>

        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Create your PopX account
        </h1>
        <p className="text-gray-500 mb-6">
          Join our community of professionals and agencies.
        </p>

        {errors.general && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <InputField
            label="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter your full name"
            error={errors.fullName}
            required
          />

          <InputField
            label="Phone number"
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter your phone number"
            error={errors.phoneNumber}
            required
          />

          <InputField
            label="Email address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            error={errors.email}
            required
          />

          <InputField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a password"
            error={errors.password}
            required
          />

          <InputField
            label="Company name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Enter your company name"
            error={errors.companyName}
          />

          <div className="mb-6">
            <label className="block text-sm font-medium text-purple-600 mb-2">
              Are you an Agency?<span className="text-red-500">*</span>
            </label>
            <div className="flex">
              <RadioButton
                label="Yes"
                value="yes"
                checked={isAgency === true}
                onChange={handleAgencyChange}
              />
              <RadioButton
                label="No"
                value="no"
                checked={isAgency === false}
                onChange={handleAgencyChange}
              />
            </div>
          </div>

          <div className="mt-8">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </Button>
          </div>

          <div className="mt-4 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="text-purple-600 hover:underline"
              >
                Login
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;