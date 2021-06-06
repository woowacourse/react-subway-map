import { Story } from '@storybook/react';

import PALETTE from '../../constants/palette';
import Palette, { PaletteProps } from './Palette';

export default {
  title: 'components/Palette',
  component: Palette,
};

const Template: Story<PaletteProps> = (args) => <Palette {...args} />;

export const Default = Template.bind({});

Default.args = {
  inputName: 'color',
  colors: [
    {
      name: PALETTE.PINK,
      disabled: false,
    },
    {
      name: PALETTE.RED,
      disabled: false,
    },
    {
      name: PALETTE.ORANGE,
      disabled: true,
    },
    {
      name: PALETTE.YELLOW,
      disabled: true,
    },
    {
      name: PALETTE.MALCHA,
      disabled: false,
    },
    {
      name: PALETTE.GREEN,
      disabled: false,
    },
    {
      name: PALETTE.SKYBLUE,
      disabled: false,
    },
    {
      name: PALETTE.BLUE,
      disabled: false,
    },
    {
      name: PALETTE.VIOLET,
      disabled: false,
    },
    {
      name: PALETTE.PURPLE,
      disabled: false,
    },
  ],
};
