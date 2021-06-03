import { Story } from '@storybook/react';
import PathMap, { PathMapProps } from './PathMap';

export default {
  title: 'molecule/PathMap',
  component: PathMap,
  argTypes: { children: { control: 'text' } },
};

const Template: Story<PathMapProps> = args => <PathMap {...args} />;

export const Basic = Template.bind({});

Basic.args = {};
