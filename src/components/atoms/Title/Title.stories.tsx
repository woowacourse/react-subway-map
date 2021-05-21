import { Story } from '@storybook/react';
import Title, { TitleProps } from './Title';

export default {
  title: 'atoms/Title',
  component: Title,
  argTypes: { children: { control: 'text' } },
};

const Template: Story<TitleProps> = args => <Title {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  children: '🚇 지하철 노선도',
};
