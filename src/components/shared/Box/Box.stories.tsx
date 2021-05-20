import Box, { BoxProps } from './Box';
import { Story } from '@storybook/react';

export default {
  title: 'components/shared/Box',
  component: Box,
};

const Template: Story<BoxProps> = (args) => <Box {...args} />;

export const Default = Template.bind({});
export const WithHat = Template.bind({});

Default.args = {
  children: <div style={{ height: '300px' }}></div>,
};

WithHat.args = {
  hatColor: '#0dd273',
  children: <div style={{ height: '300px' }}></div>,
};
