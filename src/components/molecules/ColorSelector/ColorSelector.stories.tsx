import { Story } from '@storybook/react';
import ColorSelector, { ColorSelectorProps } from './ColorSelector';

export default {
  title: 'molecule/ColorSelector',
  component: ColorSelector,
  argTypes: {},
};

const Template: Story<ColorSelectorProps> = args => <ColorSelector {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  setColor: color => {
    console.log(color);
  },
};
