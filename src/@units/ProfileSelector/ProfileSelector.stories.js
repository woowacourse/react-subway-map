import React from 'react';
import ProfileSelector from './ProfileSelector';

export default {
  title: 'units/ProfileSelector',
  component: ProfileSelector,
};

const Template = (args) => <ProfileSelector {...args} />;

export const Default = Template.bind({});
Default.args = {};
