import Button from '@shared/Button/Button';
import React from 'react';

interface PaletteProps {
  setColor: (color: string) => void;
}

const colors = [
  { bgColor: 'bg-pink-300', hoverBgColor: 'bg-pink-400' },
  { bgColor: 'bg-red-300', hoverBgColor: 'bg-red-400' },
  { bgColor: 'bg-yellow-300', hoverBgColor: 'bg-yellow-400' },
  { bgColor: 'bg-lime-300', hoverBgColor: 'bg-lime-400' },
  { bgColor: 'bg-green-300', hoverBgColor: 'bg-green-400' },
  { bgColor: 'bg-teal-300', hoverBgColor: 'bg-teal-400' },
  { bgColor: 'bg-cyan-300', hoverBgColor: 'bg-cyan-400' },
  { bgColor: 'bg-blue-300', hoverBgColor: 'bg-blue-400' },
  { bgColor: 'bg-indigo-300', hoverBgColor: 'bg-indigo-400' },
  { bgColor: 'bg-purple-300', hoverBgColor: 'bg-purple-400' },
];

const Palette = ({ setColor }: PaletteProps) => {
  return (
    <div className="flex">
      {colors.map((color) => (
        <Button
          key={color.bgColor}
          onClick={() => setColor(color.bgColor)}
          type="button"
          bgColor={color.bgColor}
          hoverBgColor={color.hoverBgColor}
          className="mr-1"
        />
      ))}
    </div>
  );
};

export default Palette;
