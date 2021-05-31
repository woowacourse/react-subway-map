import React from 'react';
import * as Styled from './MessageBox.styles';

interface Props {
  children: React.ReactNode;
  emoji: string;
}

const MessageBox = ({ emoji, children }: Props) => (
  <>
    {emoji && <Styled.EmptyEmoji>{emoji}</Styled.EmptyEmoji>}
    <Styled.EmptyMessage>{children}</Styled.EmptyMessage>
  </>
);

export default MessageBox;
