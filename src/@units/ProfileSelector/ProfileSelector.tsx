import ProfileButton from '@units/ProfileButton/ProfileButton';
import axios from 'axios';
import URL from 'constants/URL';
import React, { useEffect, useState } from 'react';

import kodaImg from 'assets/images/koda.png';
import pkImg from 'assets/images/pk.png';
import rokiImg from 'assets/images/roki.png';
import wedgeImg from 'assets/images/wedge.png';

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
        {/* TODO 방학으로 인한 AWS 정리, 서버 다시 올라오는데로 추가할 것. */}
        {/* <ProfileButton handleUrl={handleUrl} url={URL.KODA} className="mx-4" imgUrl={kodaImg} />
        <ProfileButton handleUrl={handleUrl} url={URL.PK} className="mx-4" imgUrl={pkImg} />
        <ProfileButton handleUrl={handleUrl} url={URL.WEDGE} className="mx-4" imgUrl={wedgeImg} /> */}
        <ProfileButton handleUrl={handleUrl} url={URL.ROKI} className="mx-4" imgUrl={rokiImg} />
      </div>
      <div className="mb-4 text-center text-gray-800">{message}</div>
    </>
  );
};

export default ProfileSelector;
