import Button from '@shared/Button/Button';
import Header from '@units/Header/Header';
import PATH from 'constants/PATH';
import React from 'react';
import { Link } from 'react-router-dom';

type BaseLayoutProps = {
  children: React.ReactNode;
};

const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <div>
      <Header>
        <>
          <Link to={PATH.STATION}>
            <Button className="mx-1" text="역 관리" />
          </Link>
          <Link to={PATH.LINE}>
            <Button className="mx-1" text="노선 관리" />
          </Link>
          <Link to={PATH.SECTION}>
            <Button className="mx-1" text="구간 관리" />
          </Link>
          <Link to={PATH.LOGIN}>
            <Button className="mx-1" text="로그인" />
          </Link>
        </>
      </Header>
      <div className="flex items-center justify-center min-h-screen">{children}</div>
    </div>
  );
};

export default BaseLayout;
