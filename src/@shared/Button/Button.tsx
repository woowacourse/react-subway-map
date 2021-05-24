import React from 'react';

interface ButtonProps {
  type?: 'submit' | 'button' | 'reset';
  text?: string;
  size?: string;
  bgColor?: string;
  hoverBgColor?: string;
  className?: string;
  disabled?: boolean;
}

const Button = ({ type, disabled, text, size, className, bgColor, hoverBgColor }: ButtonProps) => {
  return (
    <button
      // TODO Type Error 찾아보기
      // eslint-disable-next-line react/button-has-type
      type={type}
      disabled={disabled}
      className={`rounded focus:outline-none ${bgColor} hover:${hoverBgColor} ${className} ${size}`}
    >
      {text}
    </button>
  );
};

Button.defaultProps = {
  type: 'submit',
  disabled: false,
  text: '',
  size: 'w-24 h-12',
  bgColor: 'bg-red-300',
  hoverBgColor: 'bg-red-400',
  className: '',
};

export default Button;
