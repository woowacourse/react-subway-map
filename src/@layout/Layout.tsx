import Header from '@units/Header/Header';
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  isLogin: boolean;
}

const Layout = ({ children, isLogin }: LayoutProps) => {
  return (
    <div>
      <Header isLogin={isLogin} />
      <div className="flex items-center justify-center min-h-full font-jua">{children}</div>
    </div>
  );
};

export default Layout;
