import React from 'react';

interface TitleProps {
  text: string;
  className?: string;
}

const Title = ({ text, className }: TitleProps) => {
  return <div className={`text-3xl font-semibold ${className}`}>{text}</div>;
};

Title.defaultProps = {
  className: '',
};

export default Title;
