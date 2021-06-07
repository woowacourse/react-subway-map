import {
  LabeledNodeBlock,
  Node,
  NodeContent,
  NodeTitle,
  Vertex,
  ContentWrapper,
  NodeWrapper,
} from "./LabeledNode.styles";

export interface Props {
  title: string;
  content?: React.ReactNode;
  vertextIncluded?: boolean;
}

const LabeledNode = ({ title, content, vertextIncluded = true }: Props) => {
  return (
    <LabeledNodeBlock>
      <NodeWrapper>
        <Node />
        {vertextIncluded && <Vertex />}
      </NodeWrapper>
      <ContentWrapper>
        <NodeTitle>{title}</NodeTitle>
        {content && <NodeContent>{content}</NodeContent>}
      </ContentWrapper>
    </LabeledNodeBlock>
  );
};

export default LabeledNode;
