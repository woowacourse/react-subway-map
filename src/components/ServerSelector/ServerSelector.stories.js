import React from 'react';
import ServerSelector from './ServerSelector';

export default {
  title: 'components/ServerSelector',
  component: ServerSelector,
};

const Template = ({ ...args }) => <ServerSelector {...args} />;

export const Default = Template.bind({});

Default.args = {
  isMessageVisible: true,
  changeServer: () => console.log('서버 변경!'),
};
