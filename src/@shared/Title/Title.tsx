import React from 'react';

interface TitleProps {
  text: string;
  textSize?: string;
  className?: string;
}

const Title = ({ text, textSize, className }: TitleProps) => {
  return <div className={`${textSize || 'text-3xl'} font-semibold ${className}`}>{text}</div>;
};

Title.defaultProps = {
  textSize: '',
  className: '',
};

export default Title;
