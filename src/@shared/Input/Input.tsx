import React from 'react';

interface InputProps {
  type?: string;
  title?: string | null;
  placeholder: string;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void | null;
  value?: string | number;
  children?: React.ReactElement | null;
}

const Input = ({ children, type, title, placeholder, className, onChange, value }: InputProps) => {
  return (
    <div className={`flex relative items-center p-3 rounded ring-gray-500 ring-1 ${className}`}>
      {title && (
        <div className="absolute bottom-10 left-3 px-1 text-black text-opacity-30 text-xs bg-white">{title}</div>
      )}
      {children}
      <input
        onChange={onChange}
        value={value}
        type={type}
        className="ml-2 w-full focus:outline-none"
        placeholder={placeholder}
      />
    </div>
  );
};

Input.defaultProps = {
  type: 'text',
  title: null,
  className: '',
  onChange: null,
  value: '',
  children: null,
};

export default Input;
