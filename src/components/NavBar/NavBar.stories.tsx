import { Story } from '@storybook/react';

import NavBar from './NavBar';

export default {
  title: 'components/NavBar',
  component: NavBar,
};

const Template: Story = (args) => <NavBar {...args} />;

export const Default = Template.bind({});

Default.args = {
  children: (
    <>
      <a href="#">역</a>
      <a href="#">노선</a>
      <a href="#">구간</a>
      <a href="#">전체</a>
    </>
  ),
};
