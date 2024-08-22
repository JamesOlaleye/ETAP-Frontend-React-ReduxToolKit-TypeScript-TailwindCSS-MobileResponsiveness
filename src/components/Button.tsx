// Button.tsx
import React from 'react';

interface ButtonProps {
  onClick?: () => void; // Function to handle click events
  children: React.ReactNode; // Content to display inside the button
  variant?: 'primary' | 'secondary' | 'danger'; // Button variants
  size?: 'small' | 'medium' | 'large'; // Button sizes
  disabled?: boolean; // Disabled state
  className?: string; // Custom styles
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  variant = 'primary', // Default variant
  size = 'medium', // Default size
  disabled = false, // Default disabled state
  className = '', // Default to an empty string for additional styles
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
      disabled={disabled} // Set disabled attribute
    >
      {children} // Render button content
    </button>
  );
};

export default Button;
