import Button from '@shared/Button/Button';
import React from 'react';

const Palette = () => {
  return (
    <div className="flex">
      <Button bgColor="bg-red-300" hoverBgColor="bg-red-400" className="mx-1" />
      <Button bgColor="bg-yellow-300" hoverBgColor="bg-yellow-400" className="mx-1" />
      <Button bgColor="bg-lime-300" hoverBgColor="bg-lime-400" className="mx-1" />
      <Button bgColor="bg-green-300" hoverBgColor="bg-green-400" className="mx-1" />
      <Button bgColor="bg-teal-300" hoverBgColor="bg-teal-400" className="mx-1" />
      <Button bgColor="bg-cyan-300" hoverBgColor="bg-cyan-400" className="mx-1" />
      <Button bgColor="bg-blue-300" hoverBgColor="bg-blue-400" className="mx-1" />
      <Button bgColor="bg-indigo-300" hoverBgColor="bg-indigo-400" className="mx-1" />
      <Button bgColor="bg-purple-300" hoverBgColor="bg-purple-400" className="mx-1" />
      <Button bgColor="bg-pink-300" hoverBgColor="bg-pink-400" className="mx-1" />
    </div>
  );
};

export default Palette;
