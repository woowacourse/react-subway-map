import { Meta, Story } from '@storybook/react';
import IconButton, { IconButtonProps } from './IconButton';

export default {
  component: IconButton,
  title: 'Components/common/IconButton',
} as Meta;

const StoryTemplate: Story<IconButtonProps> = (args) => (
  <IconButton {...args} />
);

export const Default = StoryTemplate.bind({});

Default.args = {
  iconUrl: 'https://picsum.photos/200/200',
};
