import React, { PropsWithChildren } from 'react';
import PALETTE from '../../../constants/palette';
import { CardTemplateTitle, StyledCardTemplate } from './CardTemplate.styles';

interface Props {
  templateColor?: string;
  isColoredTitle?: boolean;
  titleText?: string;
  titleSize?: 'sm' | 'md' | 'lg';
}

const CardTemplate = ({
  children,
  templateColor = PALETTE.YELLOW[400],
  isColoredTitle,
  titleText,
  titleSize = 'md',
}: PropsWithChildren<Props>): JSX.Element => {
  return (
    <StyledCardTemplate
      templateColor={templateColor}
      isColoredTitle={isColoredTitle}
      titleSize={titleSize}
    >
      {titleText && <CardTemplateTitle>{titleText}</CardTemplateTitle>}
      {children}
    </StyledCardTemplate>
  );
};

export default CardTemplate;
