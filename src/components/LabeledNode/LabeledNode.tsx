import {
  LabeledNodeStylesProps,
  LabeledNodeBlock,
  Node,
  NodeContent,
  NodeTitle,
  Vertex,
  ContentWrapper,
  NodeWrapper,
} from "./LabeledNode.styles";

export interface Props extends LabeledNodeStylesProps {
  title: string;
  content?: React.ReactNode;
  vertextIncluded?: boolean;
  color?: string;
}

const LabeledNode = ({ title, content, vertextIncluded = true, color }: Props) => {
  return (
    <LabeledNodeBlock>
      <NodeWrapper>
        <Node nodeColor={color} />
        {vertextIncluded && <Vertex vertexColor={color} />}
      </NodeWrapper>
      <ContentWrapper>
        <NodeTitle textColor={color}>{title}</NodeTitle>
        {content && <NodeContent textColor={color}>{content}</NodeContent>}
      </ContentWrapper>
    </LabeledNodeBlock>
  );
};

export default LabeledNode;
