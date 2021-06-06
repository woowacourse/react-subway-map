import Input from './Input';
import { Story } from '@storybook/react';

export default {
  title: 'components/shared/Input',
  component: Input,
};

const Template: Story = (args) => <Input {...args} />;

export const Default = Template.bind({});

Default.args = {
  type: 'text',
  placeholder: 'placeholder',
};
