import styled from 'styled-components';
import { Palette } from '../../../constants/palette';
import { CardTemplateTitleSize } from './CardTemplate';

interface StyledCardTemplateProps {
  templateColor?: string;
  isColoredTitle?: boolean;
  titleSize: CardTemplateTitleSize;
}

export const StyledCardTemplate = styled.div<StyledCardTemplateProps>`
  border: 1px solid ${Palette.GRAY_300};
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

  & > .card-template-title {
    font-weight: bold;
    font-size: ${({ titleSize }) => titleSize};
    padding: 1rem 1.5rem;
    ${({ isColoredTitle, templateColor }) =>
      isColoredTitle
        ? `background-color: ${templateColor}; text-align: left; transform: translateY(-1rem);`
        : 'text-align: center; padding: 3rem 0;'}
  }
`;
