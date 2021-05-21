import { Story } from '@storybook/react';
import Input, { InputProps } from './Input';

export default {
  title: 'shared/Input',
  component: Input,
  argTypes: { children: { control: 'text' } },
};

const Template: Story<InputProps> = args => <Input {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  type: 'text',
  placeholder: '이름',
};
