import { Story } from '@storybook/react';
import RootContainer, { RootContainerProps } from './RootContainer';

export default {
  title: 'atoms/RootContainer',
  component: RootContainer,
  argTypes: { children: { control: 'text' } },
};

const Template: Story<RootContainerProps> = args => <RootContainer {...args} />;

export const Basic = Template.bind({});

Basic.args = {};
