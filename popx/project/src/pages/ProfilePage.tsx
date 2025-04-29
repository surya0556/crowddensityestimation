import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logoutUser } from '../utils/auth';
import Button from '../components/Button';
import { LogOut, Settings } from 'lucide-react';
import { User } from '../types';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      navigate('/login');
      return;
    }
    setUser(currentUser);
  }, [navigate]);

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">Account Settings</h1>
          <button 
            onClick={handleLogout}
            className="text-gray-600 hover:text-purple-600 transition-colors"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="w-24 h-24 rounded-full overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg" 
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-800">{user.fullName}</h2>
                <p className="text-gray-600 mt-2 leading-relaxed">
                  Digital marketing specialist with a passion for creating engaging content and building meaningful connections. Always exploring new ways to innovate and inspire.
                </p>
              </div>
              
              <button className="flex items-center text-purple-600 hover:text-purple-800 transition-colors">
                <Settings className="w-4 h-4 mr-1" />
                <span>Edit</span>
              </button>
            </div>
          </div>
          
          <div className="p-6">
            <Button 
              variant="secondary" 
              onClick={handleLogout}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;