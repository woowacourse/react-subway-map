import SelectInput from './SelectInput';

export default {
  title: 'Commons/SelectInput',
  component: SelectInput,
};

export const Default = () => (
  <SelectInput name='' value='' onChange={() => {}}>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </SelectInput>
);

export const InitialText = () => (
  <SelectInput name='' value='' onChange={() => {}} initialText='선택'>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </SelectInput>
);

export const BorderColor = () => (
  <SelectInput name='' value='' onChange={() => {}} borderColor='WHITE'>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </SelectInput>
);
