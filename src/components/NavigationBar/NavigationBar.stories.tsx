import { Meta, Story } from '@storybook/react';
import NavigationBar from './NavigationBar';

export default {
  title: 'Components/NavigationBar',
  component: NavigationBar,
} as Meta;

const Template: Story = (args) => <NavigationBar {...args} />;

export const Default = Template.bind({});

Default.args = {};
