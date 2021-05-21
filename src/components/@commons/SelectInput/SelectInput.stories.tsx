import SelectInput from './SelectInput';

export default {
  title: 'SelectInput',
  component: SelectInput,
};

export const Default = () => (
  <SelectInput>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </SelectInput>
);

export const InitialText = () => (
  <SelectInput initialText='선택'>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </SelectInput>
);

export const BorderColor = () => (
  <SelectInput borderColor='WHITE'>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </SelectInput>
);
