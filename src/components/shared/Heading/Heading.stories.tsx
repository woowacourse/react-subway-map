import Heading1 from './Heading1';
import { Story } from '@storybook/react';

export default {
  title: 'components/shared/Heading',
  component: Heading1,
};

const Heading1_Template: Story = () => <Heading1>Heading1</Heading1>;

export const Order1 = Heading1_Template.bind({});
