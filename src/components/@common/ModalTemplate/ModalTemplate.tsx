import React, { FC, ReactNode } from 'react';
import { ModalContentContainer, ModalTitle } from './ModalTemplate.styles';

interface ModalContentProps {
  children: ReactNode;
  titleText?: string;
}

const ModalTemplate: FC<ModalContentProps> = ({ children, titleText }) => {
  return (
    <>
      {titleText && <ModalTitle>{titleText}</ModalTitle>}
      <ModalContentContainer hasTitle={!!titleText}>{children}</ModalContentContainer>
    </>
  );
};

export default ModalTemplate;
