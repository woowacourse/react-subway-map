import React from 'react';

interface ImageButtonProps {
  imgUrl: string;
  size?: string;
}

const ImageButton = ({ imgUrl, size }: ImageButtonProps) => {
  return (
    <button type="button" className={`flex justify-center items-center bg-red-300 shadow-md rounded-full ${size}`}>
      <img className="w-5 opacity-70" src={imgUrl} alt="" />
    </button>
  );
};

ImageButton.defaultProps = {
  size: 'w-10 h-10',
};

export default ImageButton;
