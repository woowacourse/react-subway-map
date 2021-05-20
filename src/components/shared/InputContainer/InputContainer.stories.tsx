import { Story } from '@storybook/react';

import InputContainer, { InputContainerProps } from './InputContainer';

export default {
  title: 'components/shared/InputContainer',
  component: InputContainer,
};

const Template: Story<InputContainerProps> = (args) => <InputContainer {...args} />;

export const Default = Template.bind({});
export const WithLabel = Template.bind({});

Default.args = {
  children: <input type="text" />,
};

WithLabel.args = {
  labelText: 'label',
  children: (
    <select>
      <option>option</option>
    </select>
  ),
};
