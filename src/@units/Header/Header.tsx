import React from 'react';
import headerImg from 'assets/images/nanny.png';

interface HeaderProps {
  children: React.ReactNode;
}

const Header = ({ children }: HeaderProps) => {
  return (
    <header className="flex items-center justify-between p-4 bg-red-300">
      <div className="flex items-center">
        <img src={headerImg} alt="headerImg" className="w-16" />
        <h1 className="-ml-2 text-2xl font-bold">Yum0 Map</h1>
      </div>
      <nav>{children}</nav>
    </header>
  );
};

Header.defaultProps = {};

export default Header;
