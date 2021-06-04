import Input from './Input';

import Lock from '../../../assets/svg/lock.svg';

export default {
  title: 'Commons/Input',
  component: Input,
};

export const Default = () => <Input onChange={() => {}} />;

export const Emoji = () => <Input onChange={() => {}} emoji={Lock} />;

export const Label = () => <Input onChange={() => {}} label='라벨텍스트' />;

export const EmojiAndLabel = () => <Input onChange={() => {}} emoji={Lock} label='라벨텍스트' />;

export const PlaceHolder = () => <Input onChange={() => {}} placeholder='placeholder 텍스트' />;

export const BorderColor = () => <Input onChange={() => {}} borderColor='WHITE' />;
