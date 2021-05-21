import { Story } from '@storybook/react';
import Select, { SelectProps } from './Select';

export default {
  title: 'shared/Select',
  component: Select,
  argTypes: { children: { control: 'text' } },
};

const Template: Story<SelectProps> = args => <Select {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  options: ['도비', '하루', '심바'],
  onChange: () => {
    window.alert('select');
  },
};
