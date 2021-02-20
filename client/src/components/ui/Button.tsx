import * as React from 'react';
import classNames from 'classnames';

interface ButtonProps {
  onClick(): void;
  buttonClasses?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ children, buttonClasses, disabled, onClick }) => {
  const classes = classNames(
    buttonClasses,
    `
    px-8 py-2 font-semibold text-white rounded-lg shadow-xl
    transition duration-500 ease-in-out transform bg-gradient-to-r from-blue-700
    hover:from-blue-600 to-blue-600 hover:to-blue-700
    focus:ring focus:outline-none
  `,
    {
      'opacity-50 cursor-not-allowed': disabled,
    },
  );
  return (
    <button onClick={onClick} disabled={disabled} type="button" className={classes}>
      {children}
    </button>
  );
};
