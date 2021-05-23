import React from 'react';

interface ImageButtonProps {
  imgUrl: string;
  size?: string;
  imgSize?: string;
  bgColor?: string;
  className?: string;
}

const ImageButton = ({ imgUrl, size, imgSize, bgColor, className }: ImageButtonProps) => {
  return (
    <button
      type="button"
      className={`flex justify-center hover:bg-red-400 items-center shadow-md rounded-full focus:outline-none ${size} ${bgColor} ${className}`}
    >
      <img className={`opacity-70 rounded-full ${imgSize}`} src={imgUrl} alt="" />
    </button>
  );
};

ImageButton.defaultProps = {
  size: 'w-10 h-10',
  bgColor: 'bg-red-300',
  imgSize: 'w-5',
  className: '',
};

export default ImageButton;
