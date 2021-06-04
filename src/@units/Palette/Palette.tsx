import Button from '@shared/Button/Button';
import { COLORS } from 'constants/color';
import React from 'react';

interface PaletteProps {
  setColor: (color: string) => void;
}

const Palette = ({ setColor }: PaletteProps) => (
  <div className="flex">
    {Object.keys(COLORS).map((color) => {
      return (
        <Button
          key={color}
          bgColor={color}
          className="mr-1 last:mr-0"
          hoverBgColor={COLORS[color].hoverColor}
          setColor={setColor}
          type="button"
        />
      );
    })}
  </div>
);

export default Palette;
