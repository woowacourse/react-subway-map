import React from 'react';
import metroImg from 'assets/images/metro.png';
import useRedirect from 'hooks/useRedirect';
import PATH from 'constants/path';

const Home = () => {
  useRedirect(PATH.LOGIN);

  return (
    <div className="flex items-center justify-center">
      <img alt="metroImg" src={metroImg} />
    </div>
  );
};

export default Home;
