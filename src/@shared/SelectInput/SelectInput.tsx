import React from 'react';

interface SelectInputProps {
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void | null;
  defaultValue?: string;
  title?: string | null;
  children?: React.ReactNode | null;
  className?: string | null;
}

const SelectInput = ({ onChange, defaultValue, title, children, className }: SelectInputProps) => {
  return (
    <div className={`relative flex items-center p-3 w-1/2 rounded ring-gray-500 ring-1 ${className}`}>
      {title && (
        <div className="absolute bottom-9 left-3 px-1 text-black text-opacity-30 text-sm bg-white">{title}</div>
      )}
      <select className="ml-1 w-full focus:outline-none" defaultValue={defaultValue} onChange={onChange}>
        {children ?? children}
      </select>
    </div>
  );
};

SelectInput.defaultProps = {
  onChange: null,
  defaultValue: '',
  title: null,
  children: null,
  className: null,
};

export default SelectInput;
