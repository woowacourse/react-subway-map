import styled from 'styled-components';
import { TemplateProps } from './Template';

export const StyledTemplate = styled.main`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const InnerTemplate = styled.div<TemplateProps>`
  width: 100%;
  max-width: 50rem;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ type }) => type === 'vertical' && 'flex-direction: column'}
`;
