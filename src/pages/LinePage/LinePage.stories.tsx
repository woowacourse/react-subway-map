import LinePage from './LinePage';
import { Story } from '@storybook/react';
import { PageProps } from '../types';

export default {
  title: 'pages/LinePage',
  component: LinePage,
};

const Template: Story<PageProps> = (args) => <LinePage {...args} />;

export const Default = Template.bind({});

Default.args = {
  setIsLoading: () => {},
};
