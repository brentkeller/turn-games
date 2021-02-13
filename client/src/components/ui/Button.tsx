import * as React from 'react';

interface ButtonProps {
  onClick(): void;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ children, disabled, onClick }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type="button"
      className="px-8 py-2 font-semibold text-white transition duration-500 ease-in-out transform rounded-lg shadow-xl bg-gradient-to-r from-blue-700 hover:from-blue-600 to-blue-600 hover:to-blue-700 focus:ring focus:outline-none"
    >
      {children}
    </button>
  );
};
