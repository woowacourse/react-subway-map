import React from 'react';

interface InputProps {
  type?: string;
  title?: string | null;
  placeholder: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void | null;
  value?: string | number;
}

const Input = ({ type, title, placeholder, onChange, value }: InputProps) => {
  return (
    <>
      {title && (
        <div className="absolute bottom-10 left-3 px-1 text-black text-opacity-30 text-xs bg-white">{title}</div>
      )}
      <input
        className="ml-2 w-full focus:outline-none"
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
      />
    </>
  );
};

Input.defaultProps = {
  type: 'text',
  title: null,
  onChange: null,
  value: '',
};

export default Input;
