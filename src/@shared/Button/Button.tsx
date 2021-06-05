import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode | null;
  size?: string;
  bgColor?: string;
  hoverBgColor?: string;
  className?: string;
  type?: 'submit' | 'button';
}

const Button = ({ children, type, size, bgColor, hoverBgColor, className, ...props }: ButtonProps) => {
  return (
    <button className={`rounded focus:outline-none ${bgColor} hover:${hoverBgColor} ${className} ${size}`} {...props}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  children: null,
  type: 'submit',
  size: 'w-24 h-12',
  bgColor: 'bg-red-300',
  hoverBgColor: 'bg-red-400',
  className: '',
};

export default Button;
