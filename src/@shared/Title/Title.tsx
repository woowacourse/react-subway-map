import React from 'react';

interface TitleProps {
  text: string;
  textSize?: string;
  className?: string;
}

const Title = ({ text, textSize, className }: TitleProps) => {
  return <h2 className={`${textSize || 'text-3xl'} font-semibold ${className}`}>{text}</h2>;
};

Title.defaultProps = {
  textSize: '',
  className: '',
};

export default Title;
