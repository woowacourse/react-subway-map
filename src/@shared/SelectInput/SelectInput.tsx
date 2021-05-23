import React from 'react';

interface SelectInputProps {
  title?: string | null;
  children?: React.ReactNode | null;
}

const SelectInput = ({ title, children }: SelectInputProps) => {
  return (
    <div className="relative flex items-center p-3 w-1/2 rounded ring-black ring-1">
      {title && (
        <div className="absolute bottom-9 left-3 px-1 text-black text-opacity-30 text-sm bg-white">{title}</div>
      )}
      <select className="ml-1 w-full focus:outline-none">{children && children}</select>
    </div>
  );
};

SelectInput.defaultProps = {
  title: null,
  children: null,
};

export default SelectInput;
