import React from 'react';

interface InputProps {
  title?: string | null;
  placeholder: string;
  imgUrl?: string | null;
}

const Input = ({ title, placeholder, imgUrl }: InputProps) => {
  return (
    <div className="flex items-center p-3 rounded ring-black ring-1">
      {title && <div className="absolute left-8 top-2 px-1 text-black text-opacity-30 text-sm bg-white">{title}</div>}
      {imgUrl && <img className="w-6 h-6" src={imgUrl} alt={imgUrl.split('/').pop()} />}
      <input className="ml-1 w-full focus:outline-none" placeholder={placeholder} />
    </div>
  );
};

Input.defaultProps = {
  title: null,
  imgUrl: null,
};

export default Input;
