import { Meta, Story } from '@storybook/react';
import { useState } from 'react';
import Input from './Input';

export default {
  title: 'Components/common/Input',
  component: Input,
} as Meta;

const Template: Story = (args) => {
  const [value, setValue] = useState('');

  return (
    <Input
      value={value}
      onChange={({ target: { value } }) => setValue(value)}
      {...args}
    />
  );
};

export const Default = Template.bind({});

Default.args = {
  placeholder: '지하철 역을 입력하세요.',
};
