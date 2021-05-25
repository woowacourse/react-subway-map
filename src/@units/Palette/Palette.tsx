/* eslint-disable jsx-a11y/click-events-have-key-events */
import Button from '@shared/Button/Button';
import React from 'react';

interface PaletteProps {
  setColor: (selectedColor: string) => void;
}

const Palette = ({ setColor }: PaletteProps) => {
  const handleColor = (event: React.MouseEvent<HTMLElement>) => {
    // TODO as Element 를 사용하지 않고 event.target의 Attribute를 얻는 방법
    const target = event.target as Element;

    if (target.nodeName !== 'BUTTON') return;

    setColor(target.getAttribute('color') ?? '');
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div onClick={handleColor} className="flex">
      <Button type="button" bgColor="bg-red-300" hoverBgColor="bg-red-400" className="mr-1" />
      <Button type="button" bgColor="bg-yellow-300" hoverBgColor="bg-yellow-400" className="mx-1" />
      <Button type="button" bgColor="bg-lime-300" hoverBgColor="bg-lime-400" className="mx-1" />
      <Button type="button" bgColor="bg-green-300" hoverBgColor="bg-green-400" className="mx-1" />
      <Button type="button" bgColor="bg-teal-300" hoverBgColor="bg-teal-400" className="mx-1" />
      <Button type="button" bgColor="bg-cyan-300" hoverBgColor="bg-cyan-400" className="mx-1" />
      <Button type="button" bgColor="bg-blue-300" hoverBgColor="bg-blue-400" className="mx-1" />
      <Button type="button" bgColor="bg-indigo-300" hoverBgColor="bg-indigo-400" className="mx-1" />
      <Button type="button" bgColor="bg-purple-300" hoverBgColor="bg-purple-400" className="mx-1" />
      <Button type="button" bgColor="bg-pink-300" hoverBgColor="bg-pink-400" className="ml-1" />
    </div>
  );
};

export default Palette;
