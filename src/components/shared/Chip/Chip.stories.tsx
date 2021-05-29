import Chip, { ChipProps } from './Chip';
import { Story } from '@storybook/react';

export default {
  title: 'components/shared/Chip',
  component: Chip,
};

const Template: Story<ChipProps> = (args) => <Chip {...args}>피터선</Chip>;

export const Small = Template.bind({});
export const Medium = Template.bind({});
export const Large = Template.bind({});

Small.args = {
  size: 's',
  backgroundColor: 'red',
};

Medium.args = {
  size: 'm',
  backgroundColor: 'red',
};

Large.args = {
  size: 'l',
  backgroundColor: 'red',
};
