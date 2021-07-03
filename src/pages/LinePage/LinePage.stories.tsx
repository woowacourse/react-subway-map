import LinePage from './LinePage';
import { Story } from '@storybook/react';

export default {
  title: 'pages/LinePage',
  component: LinePage,
};

const Template: Story = (args) => <LinePage {...args} />;

export const Default = Template.bind({});

Default.args = {
  setIsLoading: () => {},
};
