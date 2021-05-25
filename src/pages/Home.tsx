import React from 'react';
import metroImg from 'assets/images/metro.png';
import PATH from 'constants/PATH';
import useRedirect from 'hooks/useRedirect';

const Home = () => {
  useRedirect(PATH.LOGIN);

  return (
    <div className="flex items-center justify-center">
      <img src={metroImg} alt="metroImg" />
    </div>
  );
};

export default Home;
