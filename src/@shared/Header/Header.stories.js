import Button from '@shared/Button/Button';
import React from 'react';
import Header from './Header';

export default {
  title: 'shared/Header',
  component: Header,
};

const Template = (args) => <Header {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: (
    <>
      <Button className="mx-1" text="역 관리" />
      <Button className="mx-1" text="노선 관리" />
      <Button className="mx-1" text="구간 관리" />
      <Button className="mx-1" text="로그인" />
    </>
  ),
};
