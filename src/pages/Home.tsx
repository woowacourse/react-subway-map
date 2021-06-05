import React from 'react';
import metroImg from 'assets/images/metro.png';
import PATH from 'constants/PATH';
import useCheckAuth from 'hooks/useCheckAuth';

const Home = () => {
  useCheckAuth(PATH.LOGIN);

  return (
    <div className="flex items-center justify-center">
      <img src={metroImg} alt="metroImg" />
    </div>
  );
};

export default Home;
