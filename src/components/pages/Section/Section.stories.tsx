import { Story } from '@storybook/react';
import Section from './Section';

export default {
  title: 'page/Section',
  component: Section,
  argTypes: { children: { control: 'text' } },
};

const Template: Story = args => <Section {...args} />;

export const Basic = Template.bind({});

Basic.args = {};
