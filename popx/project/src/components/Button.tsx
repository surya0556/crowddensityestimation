import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary';
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  type = 'button',
  variant = 'primary',
  className = '',
  disabled = false
}) => {
  const baseStyle = "w-full py-3 px-4 rounded-md font-medium transition-all duration-200 text-center";
  
  const variantStyles = {
    primary: "bg-purple-600 text-white hover:bg-purple-700 active:bg-purple-800",
    secondary: "bg-purple-200 text-purple-800 hover:bg-purple-300 active:bg-purple-400"
  };
  
  const disabledStyle = disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer";
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variantStyles[variant]} ${disabledStyle} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;