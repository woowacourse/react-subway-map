import { FC } from 'react';
import { FlexDirection } from '../../../types';
import { InnerTemplate, StyledTemplate } from './Template.styles';

export interface TemplateProps {
  children: React.ReactNode;
  type?: FlexDirection;
}

const Template: FC<TemplateProps> = ({ children, type }) => (
  <StyledTemplate>
    <InnerTemplate type={type}>{children}</InnerTemplate>
  </StyledTemplate>
);

export default Template;
