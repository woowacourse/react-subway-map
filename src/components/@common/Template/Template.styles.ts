import styled from 'styled-components';
import { TemplateProps } from './Template';

export const StyledTemplate = styled.main`
  height: 100%;
  padding: 2rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const InnerTemplate = styled.div<TemplateProps>`
  width: 100%;
  max-width: 50rem;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ type }) => type === 'vertical' && 'flex-direction: column'}
`;
