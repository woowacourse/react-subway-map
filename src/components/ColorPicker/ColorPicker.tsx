import { useState, InputHTMLAttributes } from "react";

import { CIRCLE_COLOR } from "../../constants/color";
import { ColorPickerBlock, ColorBlockGrid, ColorBlock, ColorPreview } from "./ColorPicker.styles";

const defaultColors = Object.values(CIRCLE_COLOR);

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  colors?: string[];
}

const ColorPicker = ({ colors = defaultColors, ...props }: Props) => {
  const [defaultColor] = colors;
  const [selectedColor, setSelectedColor] = useState(defaultColor);

  return (
    <ColorPickerBlock {...props}>
      <ColorBlockGrid>
        {colors.map((color) => (
          <ColorBlock
            backgroundColor={color}
            onClick={() => {
              setSelectedColor(color);
            }}
          />
        ))}
      </ColorBlockGrid>
      <ColorPreview backgroundColor={selectedColor} />
    </ColorPickerBlock>
  );
};

export default ColorPicker;
