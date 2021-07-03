import MapPage from './MapPage';
import { Story } from '@storybook/react';

export default {
  title: 'pages/MapPage',
  component: MapPage,
};

const Template: Story = (args) => <MapPage {...args} />;

export const Default = Template.bind({});

Default.args = {};
