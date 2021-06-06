import { Story } from '@storybook/react';

import RoundButton, { ButtonProps } from './RoundButton';

export default {
  title: 'components/shared/RoundButton',
  component: RoundButton,
};

const Template: Story<Omit<ButtonProps, 'translate'>> = (args) => (
  <RoundButton {...args}>Click</RoundButton>
);

export const Small = Template.bind({});
export const Medium = Template.bind({});
export const Large = Template.bind({});

Small.args = {
  size: 's',
  backgroundColor: '#0dd273',
  color: '#ffffff',
};

Medium.args = {
  size: 'm',
  backgroundColor: '#0dd273',
  color: '#ffffff',
};

Large.args = {
  size: 'l',
  backgroundColor: '#0dd273',
  color: '#ffffff',
};
