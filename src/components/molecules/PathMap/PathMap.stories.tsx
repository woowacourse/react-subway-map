import { Story } from '@storybook/react';
import PathMap, { IPathMapProp } from './PathMap';

export default {
  title: 'molecule/PathMap',
  component: PathMap,
  argTypes: { children: { control: 'text' } },
};

const Template: Story<IPathMapProp> = args => <PathMap {...args} />;

export const Basic = Template.bind({});
