import React from 'react';
import metroImg from 'assets/images/metro.png';
import PATH from 'constants/path';
import useRedirect from 'hooks/useRedirect';

const Home = () => {
  useRedirect(PATH.LOGIN);

  return (
    <div className="flex items-center justify-center">
      <img alt="metroImg" src={metroImg} />
    </div>
  );
};

export default Home;
