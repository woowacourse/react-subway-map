import { Story } from '@storybook/react';
import LineEditForm, { LineEditFormProps } from './LineEditForm';

export default {
  title: 'molecule/LineEditForm',
  component: LineEditForm,
  argTypes: { children: { control: 'text' } },
};

const Template: Story<LineEditFormProps> = args => <LineEditForm {...args} />;

export const Basic = Template.bind({});

Basic.args = {};
