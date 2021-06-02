import { Story } from '@storybook/react';
import StationAddForm, { StationAddFormProps } from './StationAddForm';

export default {
  title: 'molecule/StationAddForm',
  component: StationAddForm,
  argTypes: { children: { control: 'text' } },
};

const Template: Story<StationAddFormProps> = args => <StationAddForm {...args} />;

export const Basic = Template.bind({});

Basic.args = {};
