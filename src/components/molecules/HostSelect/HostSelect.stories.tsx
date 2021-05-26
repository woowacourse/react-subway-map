import { Story } from '@storybook/react';
import HostSelect from './HostSelect';

export default {
  title: 'molecule/HostSelect',
  component: HostSelect,
  argTypes: { children: { control: 'text' } },
};

const Template: Story = args => <HostSelect {...args} />;

export const Basic = Template.bind({});

Basic.args = {};
