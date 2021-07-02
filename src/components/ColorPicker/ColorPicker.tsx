import { InputHTMLAttributes, Dispatch, SetStateAction } from "react";

import { CIRCLE_COLOR } from "../../constants/color";
import {
  ColorPickerBlock,
  ColorBlockGrid,
  ColorBlock,
  ColorPreview,
} from "./ColorPicker.styles";

const colors = Object.keys(CIRCLE_COLOR) as (keyof typeof CIRCLE_COLOR)[];

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  color: keyof typeof CIRCLE_COLOR;
  onSetColor: Dispatch<SetStateAction<keyof typeof CIRCLE_COLOR>>;
}

const ColorPicker = ({ color, onSetColor, ...props }: Props) => (
  <ColorPickerBlock {...props}>
    <ColorBlockGrid>
      {colors.map((color) => (
        <ColorBlock
          key={color}
          backgroundColor={CIRCLE_COLOR[color]}
          onClick={() => {
            onSetColor(color);
          }}
        />
      ))}
    </ColorBlockGrid>
    <ColorPreview backgroundColor={CIRCLE_COLOR[color]} />
  </ColorPickerBlock>
);

export default ColorPicker;
