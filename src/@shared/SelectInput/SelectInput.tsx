import React from 'react';

interface SelectInputProps {
  title?: string | null;
  children?: React.ReactNode | null;
  className?: string | null;
  defaultValue?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void | null;
}

const SelectInput = ({ onChange, defaultValue, title, children, className }: SelectInputProps) => {
  return (
    <div className={`relative flex items-center p-3 w-1/2 rounded ring-gray-500 ring-1 ${className}`}>
      {title && (
        <div className="absolute bottom-9 left-3 px-1 text-black text-opacity-30 text-sm bg-white">{title}</div>
      )}
      <select defaultValue={defaultValue} onChange={onChange} className="ml-1 w-full focus:outline-none">
        {children}
      </select>
    </div>
  );
};

SelectInput.defaultProps = {
  defaultValue: '',
  title: null,
  children: null,
  className: null,
  onChange: null,
};

export default SelectInput;
