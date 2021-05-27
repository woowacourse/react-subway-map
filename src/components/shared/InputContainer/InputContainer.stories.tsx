import { Story } from '@storybook/react';

import Input from '../Input/Input';
import Select from '../Select/Select';

import InputContainer, { InputContainerProps } from './InputContainer';

export default {
  title: 'components/shared/InputContainer',
  component: InputContainer,
};

const Template: Story<InputContainerProps> = (args) => <InputContainer {...args} />;

export const Default = Template.bind({});
export const WithLabel = Template.bind({});

Default.args = {
  children: <Input type="text" placeholder="placeholder" />,
};

WithLabel.args = {
  labelText: 'label',
  children: (
    <select>
      {['option1', 'option2', 'option3'].map((option) => (
        <option value={option}>{option}</option>
      ))}
    </select>
  ),
};
