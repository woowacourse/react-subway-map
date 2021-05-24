import { Story } from '@storybook/react';
import SignUp from './SignUp';

export default {
  title: 'page/SignUp',
  component: SignUp,
  argTypes: { children: { control: 'text' } },
};

const Template: Story = args => <SignUp {...args} />;

export const Basic = Template.bind({});

Basic.args = {};
