import PropTypes from 'prop-types';
import React, { FC } from 'react';
import PALETTE from '../../../constants/palette';
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
  templateColor = PALETTE.YELLOW[400],
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

CardTemplate.propTypes = {
  children: PropTypes.node.isRequired,
  templateColor: PropTypes.string,
  isColoredTitle: PropTypes.bool,
  titleText: PropTypes.string,
  titleSize: PropTypes.oneOf(['sm', 'md', 'lg']),
};

export default CardTemplate;
