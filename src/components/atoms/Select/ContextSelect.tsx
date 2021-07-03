import { SelectHTMLAttributes } from 'react';
import { useFormContext } from '../../contexts/FormContext/FormContext';
import Select from './Select';

export interface IOption {
  value: number | string;
  name: string;
}

export interface ContextSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  options: IOption[];
  defaultName?: string;
}

const ContextSelect = ({ name, defaultName, options, ...props }: ContextSelectProps) => {
  const { state, onChange } = useFormContext();

  return (
    <Select
      name={name}
      defaultName={defaultName}
      options={options}
      onChange={onChange}
      value={state[name]?.value}
      {...props}
    />
  );
};

export default ContextSelect;
