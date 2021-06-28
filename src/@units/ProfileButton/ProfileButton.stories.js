import React from 'react';
import ProfileButton from './ProfileButton';

export default {
  title: 'units/ProfileButton',
  component: ProfileButton,
};

const Template = (args) => <ProfileButton {...args} />;

export const Default = Template.bind({});
Default.args = {};
