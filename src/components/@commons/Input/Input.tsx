import React from 'react';
import { Color } from '../../../constants/style';
import * as S from './Input.styles';

export interface Props {
  type?: 'email' | 'number' | 'password' | 'submit' | 'text';
  emoji?: string;
  label?: string;
  placeholder?: string;
  borderColor?: Color;
  name?: string;
  error?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  value?: string;
}

const Input = ({
  type = 'text',
  emoji,
  label,
  placeholder,
  borderColor,
  error,
  name,
  onChange,
  required,
  value,
}: Props) => {
  return (
    <S.InputContainer>
      {label && <S.Label>{label}</S.Label>}
      {emoji && <S.Emoji src={emoji} />}
      <S.Input
        type={type}
        value={value}
        placeholder={placeholder}
        borderColor={borderColor}
        error={error}
        emoji={emoji}
        name={name}
        onChange={onChange}
        required={required}
      />
    </S.InputContainer>
  );
};

export default Input;
