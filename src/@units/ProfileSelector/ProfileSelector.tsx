import ProfileButton from '@units/ProfileButton/ProfileButton';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import kodaImg from 'assets/images/koda.png';
import pkImg from 'assets/images/pk.png';
import rokiImg from 'assets/images/roki.png';
import wedgeImg from 'assets/images/wedge.png';
import URL from 'constants/url';

const serverTable: { [key: string]: string } = {
  [URL.WEDGE]: '웨지',
  [URL.KODA]: '코다',
  [URL.PK]: '피케이',
  [URL.ROKI]: '로키',
};

const ProfileSelector = () => {
  const [message, setMessage] = useState('서버를 선택해주세요.');
  const [selectedUrl, setSelectedUrl] = useState('');

  const handleUrl = (url: string) => {
    setSelectedUrl(url);
  };

  useEffect(() => {
    if (selectedUrl) {
      axios.defaults.baseURL = selectedUrl;
      setMessage(`${serverTable[selectedUrl]} 서버를 선택하셨습니다!`);
    }
  }, [selectedUrl]);

  return (
    <>
      <div className="flex justify-center mb-4">
        <ProfileButton className="mx-4" handleUrl={handleUrl} imgUrl={kodaImg} url={URL.KODA} />
        <ProfileButton className="mx-4" handleUrl={handleUrl} imgUrl={pkImg} url={URL.PK} />
        <ProfileButton className="mx-4" handleUrl={handleUrl} imgUrl={wedgeImg} url={URL.WEDGE} />
        <ProfileButton className="mx-4" handleUrl={handleUrl} imgUrl={rokiImg} url={URL.ROKI} />
      </div>
      <div className="mb-4 text-center text-gray-800">{message}</div>
    </>
  );
};

export default ProfileSelector;
