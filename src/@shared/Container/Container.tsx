import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  width?: string;
}

const Container = ({ children, width }: ContainerProps) => {
  return (
    <div className={`flex p-4 justify-center shadow-md border-t-8 border-red-300  rounded ${width}`}>{children}</div>
  );
};

Container.defaultProps = {
  width: 'w-1/3 h-40',
};

export default Container;
