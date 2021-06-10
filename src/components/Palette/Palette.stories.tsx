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
      name: PALETTE.PINK_100,
      disabled: false,
    },
    {
      name: PALETTE.RED_100,
      disabled: false,
    },
    {
      name: PALETTE.ORANGE_100,
      disabled: true,
    },
    {
      name: PALETTE.YELLOW_100,
      disabled: true,
    },
    {
      name: PALETTE.MALCHA_100,
      disabled: false,
    },
    {
      name: PALETTE.GREEN_100,
      disabled: false,
    },
    {
      name: PALETTE.SKYBLUE_100,
      disabled: false,
    },
    {
      name: PALETTE.BLUE_100,
      disabled: false,
    },
    {
      name: PALETTE.VIOLET_100,
      disabled: false,
    },
    {
      name: PALETTE.PURPLE_100,
      disabled: false,
    },
  ],
};
