import MapPage from './MapPage';
import { Story } from '@storybook/react';
import { PageProps } from '../types';

export default {
  title: 'pages/MapPage',
  component: MapPage,
};

const Template: Story<PageProps> = (args) => <MapPage {...args} />;

export const Default = Template.bind({});

Default.args = {};
