import React from 'react';

interface ButtonProps {
  text: string;
  size?: string;
  className?: string;
}

const Button = ({ text, size, className }: ButtonProps) => {
  return (
    <button
      type="button"
      className={`bg-red-300 hover:bg-red-400 rounded focus:outline-none ring-1 ring-red-300 ${className} ${size}`}
    >
      {text}
    </button>
  );
};

Button.defaultProps = {
  size: 'w-20 h-10',
  className: '',
};

export default Button;
