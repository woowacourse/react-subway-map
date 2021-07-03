import styled, { css } from 'styled-components';
import { Properties } from 'csstype';

interface ContainerProps extends Properties {
  hatColor?: string;
}

const Container = styled.div<ContainerProps>`
  position: relative;
  min-width: 30rem;
  height: fit-content;
  box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.2);
  border-bottom-left-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
  background-color: ${({ backgroundColor }) => backgroundColor ?? 'transparent'};
  padding: 2rem;

  ${({ hatColor }) =>
    hatColor &&
    css`
      :before {
        content: '';
        display: block;
        position: absolute;
        background-color: ${hatColor};
        left: 0;
        right: 0;
        height: 0.7rem;
        top: -0.7rem;
        border-top-left-radius: 0.25rem;
        border-top-right-radius: 0.25rem;
      }
    `}
`;

export { Container };
export type { ContainerProps };
