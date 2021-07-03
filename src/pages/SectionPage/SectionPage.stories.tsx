import StationPage from './SectionPage';
import { Story } from '@storybook/react';

export default {
  title: 'pages/StationPage',
  component: StationPage,
};

const Template: Story = (args) => <StationPage {...args} />;

export const Default = Template.bind({});

Default.args = {};
