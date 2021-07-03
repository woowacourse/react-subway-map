import Header from '@units/Header/Header';
import useCheckingAuth from 'hooks/useCheckingAuth';
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const isLogin = !!useCheckingAuth();

  return (
    <div>
      <Header isLogin={isLogin} />
      <div className="flex items-center justify-center min-h-full font-jua">{children}</div>
    </div>
  );
};

export default Layout;
