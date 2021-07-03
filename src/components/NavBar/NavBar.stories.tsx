import { Story } from '@storybook/react';

import NavBar from './NavBar';

export default {
  title: 'components/NavBar',
  component: NavBar,
};

const Template: Story = (args) => <NavBar {...args} />;

export const Default = Template.bind({});

Default.args = {
  children: ['역', '노선', '구간', '전체'].map((item) => <a href="#">{item}</a>),
};
