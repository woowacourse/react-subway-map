import { Story } from '@storybook/react';
import Station from './Station';

export default {
  title: 'page/Station',
  component: Station,
  argTypes: { children: { control: 'text' } },
};

const Template: Story = args => <Station {...args} />;

export const Basic = Template.bind({});

Basic.args = {};
