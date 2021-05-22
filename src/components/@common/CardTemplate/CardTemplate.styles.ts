import styled from 'styled-components';
import PALETTE from '../../../constants/palette';

interface StyledCardTemplateProps {
  templateColor: string;
  isColoredTitle: boolean;
  titleSize: 'sm' | 'md' | 'lg';
}

const TITLE_SIZE = {
  sm: '1.75rem',
  md: '2.25rem',
  lg: '3rem',
};

export const CardTemplateTitle = styled.div``;

export const StyledCardTemplate = styled.div<StyledCardTemplateProps>`
  border: 1px solid ${PALETTE.GRAY[300]};
  border-radius: 10px;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.2);
  overflow: hidden;

  &::before {
    content: '';
    display: block;
    background-color: ${({ templateColor }) => templateColor};
    width: 100%;
    height: 1rem;
  }

  ${CardTemplateTitle} {
    font-weight: bold;
    font-size: ${({ titleSize }) => TITLE_SIZE[titleSize]};
    padding: 1rem 1.5rem;
    ${({ isColoredTitle, templateColor }) =>
      isColoredTitle
        ? `background-color: ${templateColor};`
        : 'text-align: center; padding: 3rem 0;'}
  }
`;
