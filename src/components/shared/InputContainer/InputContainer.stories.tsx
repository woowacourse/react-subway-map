import { Story } from '@storybook/react';
import Input from '../Input/Input';

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
      <option>option</option>
    </select>
  ),
};
