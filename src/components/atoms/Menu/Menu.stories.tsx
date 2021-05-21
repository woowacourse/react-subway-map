import { Story } from '@storybook/react';
import { MenuButton } from '../Button/Button.stories';
import Menu, { MenuProps } from './Menu';

export default {
  title: 'atoms/Menu',
  component: Menu,
  argTypes: {},
};

const Template: Story<MenuProps> = args => <Menu {...args} />;

Template.args = {
  children: <div>{MenuButton}</div>,
};
