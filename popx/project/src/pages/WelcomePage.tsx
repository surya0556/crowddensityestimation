import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { isAuthenticated } from '../utils/auth';
import { UserCircle } from 'lucide-react';

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to profile if already authenticated
    if (isAuthenticated()) {
      navigate('/profile');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8 animate-fadeIn">
        <div className="flex items-center justify-center mb-6">
          <UserCircle className="h-12 w-12 text-purple-600" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome to PopX</h1>
        <p className="text-gray-500 mb-8">
          Your all-in-one platform for managing digital presence and customer engagement.
        </p>

        <div className="space-y-4">
          <Button 
            variant="primary" 
            onClick={() => navigate('/register')}
            className="transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Create Account
          </Button>
          
          <Button 
            variant="secondary" 
            onClick={() => navigate('/login')}
            className="transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Already Registered? Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;