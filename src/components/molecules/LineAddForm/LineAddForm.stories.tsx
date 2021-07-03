import { Story } from '@storybook/react';
import LineAddForm, { LineAddFormProps } from './LineAddForm';

export default {
  title: 'molecule/LineAddForm',
  component: LineAddForm,
  argTypes: { children: { control: 'text' } },
};

const Template: Story<LineAddFormProps> = args => <LineAddForm {...args} />;

export const Basic = Template.bind({});

Basic.args = {};
