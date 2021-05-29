import { Story } from '@storybook/react';
import Main, { MainProps } from './Main';
import subwayImage from '../../../assets/img/subway.png';

export default {
  title: 'atoms/Main',
  component: Main,
  argTypes: { children: { control: 'text' } },
};

const Template: Story<MainProps> = args => <Main {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  children: <img src={subwayImage} />,
};
