import styled from 'styled-components';

interface ModalContentContainerProps {
  hasTitle: boolean;
}

export const ModalTitle = styled.h2`
  text-align: center;
  margin-top: 1.5rem;
`;

export const ModalContentContainer = styled.div<ModalContentContainerProps>`
  max-height: calc(80vh - ${({ hasTitle }) => (hasTitle ? '10rem' : '6rem')});
  margin-top: 1.5rem;
  overflow-y: auto;
`;
