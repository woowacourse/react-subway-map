import styled from "styled-components";

import { Flex, FlexAlignCenter } from "../Layout";

const LabeledNodeBlock = styled.div`
  display: flex;
`;

const NodeWrapper = styled(FlexAlignCenter)`
  flex-direction: column;
  margin-right: 10px;
`;

const Node = styled.div`
  border-radius: 50%;
  border: 4px solid #2699fb;
  width: 1.125rem;
  height: 1.125rem;
  margin-bottom: 8px;
`;

const Vertex = styled.div`
  height: 9.375rem;
  border: 2px solid #bce0fd;
  border-radius: 0.3125rem;
`;

const ContentWrapper = styled(Flex)`
  flex-direction: column;
  justify-content: flex-start;
`;

const NodeTitle = styled.span`
  color: #2699fb;
  font-weight: bold;
  font-size: 1.0625rem;
  margin-bottom: 0.5rem;
`;

const NodeContent = styled.span`
  color: #2699fb;
  font-size: 0.875rem;
`;

export {
  LabeledNodeBlock,
  NodeWrapper,
  Node,
  Vertex,
  ContentWrapper,
  NodeTitle,
  NodeContent,
};
