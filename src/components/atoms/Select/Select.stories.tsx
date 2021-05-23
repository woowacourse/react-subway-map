import { Story } from '@storybook/react';
import stationList from '../../../fixtures/stationList';
import Select, { SelectProps } from './Select';

export default {
  title: 'atoms/Select',
  component: Select,
  argTypes: { children: { control: 'text' } },
};

const Template: Story<SelectProps> = args => <Select {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  options: stationList,
  onChange: () => {
    window.alert('select');
  },
};
