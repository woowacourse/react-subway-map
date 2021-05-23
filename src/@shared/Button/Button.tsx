import React from 'react';

interface ButtonProps {
  text?: string;
  size?: string;
  bgColor?: string;
  hoverBgColor?: string;
  className?: string;
}

const Button = ({ text, size, className, bgColor, hoverBgColor }: ButtonProps) => {
  return (
    <button
      type="button"
      className={`rounded focus:outline-none ${bgColor} hover:${hoverBgColor} ${className} ${size}`}
    >
      {text}
    </button>
  );
};

Button.defaultProps = {
  text: '',
  size: 'w-20 h-10',
  bgColor: 'bg-red-300',
  hoverBgColor: 'bg-red-400',
  className: '',
};

export default Button;
