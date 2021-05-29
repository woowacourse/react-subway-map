import { Story } from '@storybook/react';
import Select, { SelectProps } from './Select';

export default {
  title: 'atoms/Select',
  component: Select,
  argTypes: { children: { control: 'text' } },
};

const Template: Story<SelectProps> = args => <Select {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  defaultName: '콜린',
};
