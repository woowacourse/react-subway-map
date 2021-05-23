import React from 'react';

interface InputProps {
  title?: string | null;
  placeholder: string;
  imgUrl?: string | null;
  className?: string;
}

const Input = ({ title, placeholder, imgUrl, className }: InputProps) => {
  return (
    <div className={`flex relative items-center p-3 rounded ring-gray-500 ring-1 ${className}`}>
      {title && (
        <div className="absolute bottom-10 left-3 px-1 text-black text-opacity-30 text-xs bg-white">{title}</div>
      )}
      {imgUrl && <img className="w-6 h-6" src={imgUrl} alt={imgUrl.split('/').pop()} />}
      <input className="ml-2 w-full focus:outline-none" placeholder={placeholder} />
    </div>
  );
};

Input.defaultProps = {
  title: null,
  imgUrl: null,
  className: '',
};

export default Input;
