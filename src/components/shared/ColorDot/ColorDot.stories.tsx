import ColorDot, { ColorDotProps } from './ColorDot';
import { Story } from '@storybook/react';

export default {
  title: 'components/shared/ColorDot',
  component: ColorDot,
};

const Template: Story<ColorDotProps> = (args) => <ColorDot {...args} />;

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
