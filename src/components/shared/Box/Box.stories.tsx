import Box, { BoxProps } from './Box';
import { Story } from '@storybook/react';
import PALETTE from '../../../constants/palette';

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
  hatColor: PALETTE.NAVER,
  children: <div style={{ height: '300px' }}></div>,
};
