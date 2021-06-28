import React from 'react';

interface InputContainerProps {
  imgUrl?: string;
  children: React.ReactNode;
  className?: string;
}

const InputContainer = ({ imgUrl, children, className }: InputContainerProps) => {
  return (
    <div className={`flex relative items-center p-3 rounded ring-gray-500 ring-1 ${className}`}>
      {imgUrl && <img alt={imgUrl?.split('/').pop()} className="w-6 h-6" src={imgUrl} />}
      {children}
    </div>
  );
};

InputContainer.defaultProps = {
  imgUrl: null,
  className: '',
};

export default InputContainer;
