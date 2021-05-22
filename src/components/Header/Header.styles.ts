import styled, { keyframes, css } from 'styled-components';
import { Properties } from 'csstype';

const slideIn = keyframes`
  from {
    transform: translateY(-105%);
  }

  to {
    transform: translateY(0);
  }
`;

const slideOut = keyframes`
  from {
    transform: translateY(0);
  }

  to {
    transform: translateY(-105%);
  }
`;

interface ContainerProps extends Properties {
  isAppear: boolean;
}

const Container = styled.div<ContainerProps>`
  width: 100%;
  height: 3.75rem;
  background-color: ${({ backgroundColor }) => backgroundColor || 'transparent'};
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 0;
  color: ${({ color }) => color};

  animation: ${({ isAppear }) =>
    isAppear
      ? css`
          ${slideIn} 0.2s
        `
      : css`
          ${slideOut} 0.2s
        `};
  transform: ${({ isAppear }) => (isAppear ? 'translateY(0)' : 'translateY(-105%)')};
`;

const Inner = styled.div`
  height: 100%;
  max-width: 1080px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export { Container, Inner };
