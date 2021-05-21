import React from 'react';

interface ButtonProps {
  text: string;
  size?: string;
}

const Button = ({ text, size }: ButtonProps) => {
  return (
    <button type="button" className={`bg-red-300 hover:bg-red-400 rounded ${size}`}>
      {text}
    </button>
  );
};

Button.defaultProps = {
  size: 'w-20 h-10',
};

export default Button;
