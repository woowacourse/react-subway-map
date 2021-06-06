import { Story } from '@storybook/react';

import Header, { HeaderProps } from './Header';

export default {
  title: 'components/Header',
  component: Header,
};

const Template: Story<HeaderProps> = (args) => <Header {...args} />;

export const Default = Template.bind({});

Default.args = {
  children: (
    <>
      <div>로고지롱</div>
      <div>메뉴지롱</div>
    </>
  ),
  backgroundColor: '#95e3bd',
};
