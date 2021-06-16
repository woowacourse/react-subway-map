import Select from "../Select/Select";
import { Props as SelectProps } from "../Select/Select";

import useForm from "../../hooks/useForm";

export interface Props extends SelectProps {
  name: string;
}

const SelectField = ({ name, ...props }: Props) => {
  const { values, onChange } = useForm();

  return (
    <Select value={values[name]} name={name} onChange={onChange} {...props} />
  );
};

export default SelectField;
