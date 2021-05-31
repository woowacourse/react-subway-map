import { useState } from 'react';
import { Color } from '../types';

const useColorPalette = (initialValue = Color.RED_200) => {
  const [color, setColor] = useState(initialValue);

  const onChange = (selectedColor: Color) => {
    setColor(selectedColor);
  };

  return { color, onChange };
};

export default useColorPalette;
