import React from 'react';
import { User } from '../types';

interface ProfilePictureProps {
  user: User;
  size?: 'sm' | 'md' | 'lg';
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({ user, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
  };

  const initials = user.fullName
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);

  return (
    <div className={`relative ${sizeClasses[size]} rounded-full overflow-hidden bg-gray-200 flex items-center justify-center`}>
      {user.profilePicture ? (
        <img
          src={user.profilePicture}
          alt={user.fullName}
          className="w-full h-full object-cover"
        />
      ) : (
        <span className="text-gray-600 font-medium">{initials}</span>
      )}
      {user.isAgency && (
        <div className="absolute bottom-0 right-0 w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center text-white text-xs">
          A
        </div>
      )}
    </div>
  );
};

export default ProfilePicture;