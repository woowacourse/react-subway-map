import React from 'react';
import NotificationInput from './NotificationInput';

export default {
  component: NotificationInput,
  title: 'common/NotificationInput',
};

const Template = (args) => <NotificationInput {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const Error = Template.bind({});
Error.args = {
  messageInfo: { text: '에러 메세지', isError: true },
};

export const Success = Template.bind({});
Success.args = {
  messageInfo: { text: '성공 메세지', isError: false },
};
