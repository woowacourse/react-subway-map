import { useState } from 'react';
import { Color } from '../types';

const useColorPalette = (initialValue?: Color) => {
  const [color, setColor] = useState<Color>(initialValue || Color.RED_200);

  const onChange = (selectedColor: Color): void => {
    setColor(selectedColor);
  };

  return { color, onChange };
};

export default useColorPalette;
