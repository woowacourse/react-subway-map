import { Story } from '@storybook/react';

import Select from './Select';

export default {
  title: 'components/shared/Select',
  component: Select,
};

const Template: Story = (args) => (
  <Select {...args}>
    {['option1', 'option2', 'option3'].map((option) => (
      <option value={option}>{option}</option>
    ))}
  </Select>
);

export const Default = Template.bind({});
