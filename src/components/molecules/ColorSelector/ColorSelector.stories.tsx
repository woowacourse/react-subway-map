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
  // TODO: palette 상수화
  colorList: [
    '#FCA5A5',
    '#DC2626',
    '#DB2777',
    '#ED8936',
    '#34D399',
    '#7C3AED',
    '#1D4ED8',
    '#6B7280',
    '#D6AF32',
    '#7B341E',
  ],
  setColor: color => {
    console.log(color);
  },
};
