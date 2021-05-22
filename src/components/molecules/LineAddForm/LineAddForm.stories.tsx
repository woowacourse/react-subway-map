import { Story } from '@storybook/react';
import LineAddForm, { LineAddFormProps } from './LineAddForm';

export default {
  title: 'molecule/LineAddForm',
  component: LineAddForm,
  argTypes: { children: { control: 'text' } },
};

const Template: Story<LineAddFormProps> = args => <LineAddForm {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  stationList:[{ id:1, name:'도비1'}, { id:2, name:'도비2'}, { id:3, name:'도비3'}],
};
