import React from 'react';
import Input from './Input';
// import { ReactComponent as LockSvg } from './../../assets/svg/lock.svg';
import Lock from './../../assets/svg/lock.svg';
import { COLOR } from '../../constants/styleConstant';

export default {
  title: 'Input',
  component: Input,
};

export const Default = () => <Input />;

export const Emoji = () => <Input emoji={Lock} />;

export const Label = () => <Input label='라벨텍스트' />;

export const EmojiAndLabel = () => <Input emoji={Lock} label='라벨텍스트' />;

export const PlaceHolder = () => <Input placeholder='placeholder 텍스트' />;

export const BorderColor = () => <Input borderColor={COLOR.WHITE} />;
