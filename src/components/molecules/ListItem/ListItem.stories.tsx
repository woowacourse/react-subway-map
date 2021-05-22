import { Story } from '@storybook/react';
import ListItem, { ListItemProps } from './ListItem';

export default {
  title: 'molecule/ListItem',
  component: ListItem,
  argTypes: { children: { control: 'text' } },
};

const Template: Story<ListItemProps> = args => <ListItem {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  content: '도비역',
};
