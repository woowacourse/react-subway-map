import { Story } from '@storybook/react';
import Button, { ButtonProps } from './Button';

export default {
  title: 'atoms/Button',
  component: Button,
  argTypes: { children: { control: 'text' } },
};

const Template: Story<ButtonProps> = args => <Button {...args} />;

export const DefaultButton = Template.bind({});
export const EditButton = Template.bind({});
export const MenuButton = Template.bind({});

DefaultButton.args = {
  children: '제출 버튼',
  buttonTheme: 'default',
};

EditButton.args = {
  children: '수정 버튼',
  buttonTheme: 'edit',
};

MenuButton.args = {
  children: '📌 메뉴 버튼',
  buttonTheme: 'menu',
};
