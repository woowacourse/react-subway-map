import { Meta, Story } from '@storybook/react';
import SelectBox from './SelectBox';

export default {
  title: 'Components/common/SelectBox',
  component: SelectBox,
} as Meta;

const Template: Story = (args) => (
  <SelectBox {...args}>
    <option value="hi">hi</option>
  </SelectBox>
);

export const Default = Template.bind({});

Default.args = {};
