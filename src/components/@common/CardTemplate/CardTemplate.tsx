import React, { FC } from 'react';
import { Palette } from '../../../constants/palette';
import { CardTemplateTitle, StyledCardTemplate } from './CardTemplate.styles';

export enum CardTemplateTitleSize {
  sm = '1.75rem',
  md = '2.25rem',
  lg = '3rem',
}

interface Props {
  children: React.ReactNode;
  templateColor?: string;
  isColoredTitle?: boolean;
  titleText?: string;
  titleSize?: CardTemplateTitleSize;
}

const CardTemplate: FC<Props> = ({
  children,
  templateColor = Palette.YELLOW_400,
  isColoredTitle,
  titleText,
  titleSize = CardTemplateTitleSize.md,
}) => {
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
