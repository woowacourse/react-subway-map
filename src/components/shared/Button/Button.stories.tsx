import { Story } from '@storybook/react';

import Button, { ButtonProps } from './Button';

export default {
  title: 'components/shared/Button',
  component: Button,
};

const Template: Story<Omit<ButtonProps, 'translate'>> = (args) => <Button {...args}>Click</Button>;

export const Small = Template.bind({});
export const Medium = Template.bind({});
export const Large = Template.bind({});

export const WithWidth = Template.bind({});

Small.args = {
  size: 's',
  backgroundColor: '#0dd273',
  color: '#ffffff',
  width: '',
};

Medium.args = {
  size: 'm',
  backgroundColor: '#0dd273',
  color: '#ffffff',
  width: '',
};

Large.args = {
  size: 'l',
  backgroundColor: '#0dd273',
  color: '#ffffff',
  width: '',
};

WithWidth.args = {
  size: 'm',
  backgroundColor: '#0dd273',
  color: '#ffffff',
  width: '100%',
};
