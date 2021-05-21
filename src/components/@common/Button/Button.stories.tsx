import { Meta, Story } from '@storybook/react';
import Button from './Button.styles';

export default {
  title: 'Components/common/Button',
  component: Button,
  argTypes: {
    onClick: { action: 'clicked' },
  },
} as Meta;

const Template: Story = (args) => <Button {...args}>버튼</Button>;

export const Default = Template.bind({});

Default.args = {};
