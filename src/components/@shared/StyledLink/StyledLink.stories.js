import React from 'react';
import StyledLink from './StyledLink';

export default {
  title: 'shared/StyledLink',
  component: StyledLink,
  argTypes: {},
};

const Template = (args) => <StyledLink {...args}>로그인</StyledLink>;

export const Default = Template.bind({});
Default.args = {};
