import styled from "styled-components";
import { FlexAlignCenter, Flex } from "../@shared/FlexContainer/FlexContainer";

export interface LabeledNodeStylesProps {}

export const LabeledNodeBlock = styled.div`
  display: flex;
`;

export const NodeWrapper = styled(FlexAlignCenter)`
  flex-direction: column;
  margin-right: 10px;
`;

export const Node = styled.div<{ nodeColor?: string }>`
  border-radius: 50%;
  border: 4px solid ${({ nodeColor }) => (nodeColor ? nodeColor : "#2699fb")};
  width: 1.125rem;
  height: 1.125rem;
  margin-bottom: 8px;
`;

export const Vertex = styled.div<{ vertexColor?: string }>`
  height: 9.375rem;
  border: 2px solid ${({ vertexColor }) => `rgba(${vertexColor}, 0.2)`};
  border-radius: 0.3125rem;
`;

export const ContentWrapper = styled(Flex)`
  flex-direction: column;
  justify-content: flex-start;
`;

export const NodeTitle = styled.span<{ textColor?: string }>`
  width: 80px;
  color: ${({ textColor }) => (textColor ? textColor : "#2699fb")};
  font-weight: bold;
  font-size: 1.0625rem;
  margin-bottom: 0.5rem;
`;

export const NodeContent = styled.span<{ textColor?: string }>`
  color: ${({ textColor }) => (textColor ? textColor : "#2699fb")};
  font-size: 0.875rem;
`;
