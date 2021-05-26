import SignupPage from './SignupPage';
import { Story } from '@storybook/react';
import { PageProps } from '../types';

export default {
  title: 'pages/SignupPage',
  component: SignupPage,
};

const Template: Story<PageProps> = (args) => <SignupPage {...args} />;

export const Default = Template.bind({});

Default.args = {};
