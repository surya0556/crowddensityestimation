import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import InputField from '../components/InputField';
import { loginUser, isAuthenticated } from '../utils/auth';
import { validateEmail, validatePassword } from '../utils/formValidation';
import { ArrowLeft } from 'lucide-react';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '', general: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Redirect to profile if already authenticated
    if (isAuthenticated()) {
      navigate('/profile');
    }
  }, [navigate]);

  const validateForm = (): boolean => {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    
    setErrors({
      email: emailError,
      password: passwordError,
      general: ''
    });
    
    return !emailError && !passwordError;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        const user = loginUser(email, password);
        
        if (user) {
          navigate('/profile');
        } else {
          setErrors(prev => ({
            ...prev,
            general: 'Invalid email or password. Please try again.'
          }));
        }
      } catch (error) {
        setErrors(prev => ({
          ...prev,
          general: 'An error occurred during login. Please try again.'
        }));
      } finally {
        setIsSubmitting(false);
      }
    }
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
          Signin to your PopX account
        </h1>
        <p className="text-gray-500 mb-6">
          Enter your credentials to access your account.
        </p>

        {errors.general && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <InputField
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email address"
            error={errors.email}
            required
          />

          <InputField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            error={errors.password}
            required
          />

          <div className="mt-8">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
            </Button>
          </div>

          <div className="mt-4 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/register')}
                className="text-purple-600 hover:underline"
              >
                Create an account
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;