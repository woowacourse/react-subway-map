import React from 'react';

interface ImageButtonProps {
  imgUrl: string;
  size?: string;
  imgSize?: string;
  bgColor?: string;
  hoverBgColor?: string;
  className?: string;
  onClick?: () => void;
}

const ImageButton = ({ onClick, imgUrl, size, imgSize, bgColor, hoverBgColor, className }: ImageButtonProps) => {
  return (
    <button
      className={`flex justify-center items-center shadow-md rounded-full focus:outline-none ${size} ${bgColor} hover:${hoverBgColor} ${className}`}
      type="button"
      onClick={onClick}
    >
      <img alt="" className={`opacity-70 rounded-full ${imgSize}`} src={imgUrl} />
    </button>
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
