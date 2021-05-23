import { IStationRes } from '../../../type';
import { Container } from './Select.styles';

export interface SelectProps {
  options: IStationRes[];
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  value: number;
  defaultName?: string;
}

const Select = ({ defaultName, options, onChange, value, ...props }: SelectProps) => (
  <Container onChange={onChange} value={value} {...props}>
    {defaultName && (
      <option selected disabled>
        {defaultName}
      </option>
    )}

    {options.map(({ id, name }) => (
      <option key={id} value={id}>
        {name}
      </option>
    ))}
  </Container>
);

export default Select;
