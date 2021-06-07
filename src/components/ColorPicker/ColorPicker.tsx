import { InputHTMLAttributes, Dispatch, SetStateAction } from "react";

import { CIRCLE_COLOR, CIRCLE_COLOR_CODE } from "../../constants/color";
import { ColorPickerBlock, ColorBlockGrid, ColorBlock, ColorPreview } from "./ColorPicker.styles";

const colors = Object.keys(CIRCLE_COLOR) as CIRCLE_COLOR_CODE[];

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  color: CIRCLE_COLOR_CODE;
  onSetColor: Dispatch<SetStateAction<CIRCLE_COLOR_CODE>>;
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
