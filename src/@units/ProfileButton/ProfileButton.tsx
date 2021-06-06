import React from 'react';

interface ProfileButtonProps {
  imgUrl: string;
  size?: string;
  imgSize?: string;
  className?: string;
  url: string;
  handleUrl: (url: string) => void;
}

const ProfileButton = ({ handleUrl, url, imgUrl, size, imgSize, className }: ProfileButtonProps) => {
  const handleClick = () => {
    handleUrl(url);
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      className={`flex justify-center items-center shadow-md rounded-full focus:outline-none ${size} ${className}`}
    >
      <img className={`opacity-70 rounded-full ${imgSize}`} src={imgUrl} />
    </button>
  );
};

ProfileButton.defaultProps = {
  size: 'w-10 h-10',
  imgSize: 'w-10',
  className: '',
};

export default ProfileButton;
