// Button.tsx
import React from 'react';

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger'; // Button variants
  size?: 'small' | 'medium' | 'large'; // Button sizes
  disabled?: boolean; // Disabled state
  className?: string; // Add className prop for custom styles
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  className = '', // Default to an empty string
}) => {
  const baseStyles =
    'transition duration-300 ease-in-out rounded focus:outline-none focus:ring-2';

  const sizeStyles = {
    small: 'py-2 px-4 text-sm',
    medium: 'py-3 px-6 text-md',
    large: 'py-4 px-8 text-lg',
  };

  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-300 text-black hover:bg-gray-400',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size]} ${
        variantStyles[variant]
      } ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;