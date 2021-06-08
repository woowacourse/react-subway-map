import React, { FC } from 'react';
import { Palette } from '../../../constants/palette';
import { CardTemplateTitle, StyledCardTemplate } from './CardTemplate.styles';

interface Props {
  children: React.ReactNode;
  templateColor?: string;
  isColoredTitle?: boolean;
  titleText?: string;
  titleSize?: 'sm' | 'md' | 'lg';
}

const CardTemplate: FC<Props> = ({
  children,
  templateColor = Palette.YELLOW_400,
  isColoredTitle,
  titleText,
  titleSize = 'md',
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
