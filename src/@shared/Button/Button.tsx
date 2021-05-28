import React from 'react';

interface ButtonProps {
  type?: 'submit' | 'button' | 'reset';
  text?: string;
  size?: string;
  bgColor?: string;
  hoverBgColor?: string;
  className?: string;
  disabled?: boolean;
  onClick?: () => void | null;
  setColor?: (color: string) => void | null;
}

const Button = ({ setColor, type, disabled, text, size, className, bgColor, hoverBgColor, onClick }: ButtonProps) => {
  const handleColor = () => {
    return setColor?.(bgColor ?? '');
  };

  return (
    <button
      // TODO Type Error 찾아보기
      // eslint-disable-next-line react/button-has-type
      type={type}
      disabled={disabled}
      onClick={() => handleColor() ?? onClick}
      color={bgColor}
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
  onClick: null,
  setColor: null,
};

export default Button;
