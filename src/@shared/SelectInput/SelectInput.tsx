import React from 'react';

interface SelectInputProps {
  title?: string | null;
  className?: string | null;
  defaultValue?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void | null;
  data?: Array<DataProps> | null;
  defaultSelect?: string;
}

interface DataProps {
  id: number;
  name: string;
}

const SelectInput = ({ onChange, defaultValue, title, className, data, defaultSelect }: SelectInputProps) => {
  return (
    <div className={`relative flex items-center p-3 w-1/2 rounded ring-gray-500 ring-1 ${className}`}>
      {title && (
        <div className="absolute bottom-9 left-3 px-1 text-black text-opacity-30 text-sm bg-white">{title}</div>
      )}
      <select className="ml-1 w-full focus:outline-none" defaultValue={defaultValue} onChange={onChange}>
        <option disabled hidden value="DEFAULT">
          {defaultSelect}
        </option>
        {data?.map((x) => (
          <option key={x.id} value={x.id}>
            {x.name}
          </option>
        ))}
      </select>
    </div>
  );
};

SelectInput.defaultProps = {
  defaultValue: '',
  title: null,
  className: null,
  onChange: null,
  data: null,
  defaultSelect: null,
};

export default SelectInput;
