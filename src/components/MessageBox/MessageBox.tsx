import React from 'react';
import * as Styled from './MessageBox.styles';

interface IProps {
  children: React.ReactNode;
  emoji: string;
}

const MessageBox = ({ emoji, children }: IProps) => (
  <>
    {emoji && <Styled.EmptyEmoji>{emoji}</Styled.EmptyEmoji>}
    <Styled.EmptyMessage>{children}</Styled.EmptyMessage>
  </>
);

export default MessageBox;
