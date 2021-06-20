import { Meta, Story } from '@storybook/react';
import MapPage from './MapPage';

export default {
  title: 'pages/Map',
  component: MapPage,
} as Meta;

const Template: Story = (args) => {
  return <MapPage {...args} />;
};

export const Default = Template.bind({});

Default.args = {};
