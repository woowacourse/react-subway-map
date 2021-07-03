import StationPage from './SectionPage';
import { Story } from '@storybook/react';
import { PageProps } from '../types';

export default {
  title: 'pages/StationPage',
  component: StationPage,
};

const Template: Story<PageProps> = (args) => <StationPage {...args} />;

export const Default = Template.bind({});

Default.args = {};
