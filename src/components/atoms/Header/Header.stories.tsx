import { Story } from '@storybook/react';
import Header, { HeaderProps } from './Header';

export default {
  title: 'atoms/Header',
  component: Header,
  argTypes: { children: { control: 'text' } },
};

const Template: Story<HeaderProps> = args => <Header {...args} />;

export const HeaderBasic = Template.bind({});
export const HeaderWithButton = Template.bind({});

HeaderBasic.args = {
  children: '역 관리',
};

HeaderWithButton.args = {
  children: (
    <>
      <h3>노선 관리</h3>
      <button>추가</button>
    </>
  ),
  hasExtra: true,
};
