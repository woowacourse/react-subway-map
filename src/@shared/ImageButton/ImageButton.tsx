import Button from '@shared/Button/Button';
import React from 'react';

interface ImageButtonProps {
  imgUrl: string;
  size?: string;
  imgSize?: string;
  bgColor?: string;
  hoverBgColor?: string;
  className?: string;
  onClick?: () => void | null;
}

const ImageButton = ({ onClick, imgUrl, size, imgSize, bgColor, hoverBgColor, className }: ImageButtonProps) => {
  return (
    <Button
      onClick={onClick}
      type="button"
      size={size}
      bgColor={bgColor}
      hoverBgColor={hoverBgColor}
      className={`flex justify-center items-center shadow-md rounded-full ${className}`}
    >
      <img className={`opacity-70 rounded-full ${imgSize}`} src={imgUrl} alt="" />
    </Button>
  );
};

ImageButton.defaultProps = {
  size: 'w-10 h-10',
  bgColor: 'bg-red-300',
  hoverBgColor: 'bg-red-400',
  imgSize: 'w-5',
  className: '',
  onClick: null,
};

export default ImageButton;
