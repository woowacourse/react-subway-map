import React from 'react';
import headerImg from 'assets/images/nanny.png';
import { Link } from 'react-router-dom';
import PATH from 'constants/PATH';

interface HeaderProps {
  children: React.ReactNode;
}

const Header = ({ children }: HeaderProps) => {
  return (
    <header className="flex items-center justify-between mb-10 p-4 w-full bg-red-300">
      <Link to={PATH.HOME}>
        <div className="flex items-center">
          <img alt="headerImg" className="w-16" src={headerImg} />
          <h1 className="font-staatliches -ml-2 text-3xl font-bold">Yum0 Map</h1>
        </div>
      </Link>
      <nav className="font-jua">{children}</nav>
    </header>
  );
};

Header.defaultProps = {};

export default Header;
