import styled from "styled-components";

const Flex = styled.div`
  display: flex;
`;

const FlexJustfiyCenter = styled(Flex)`
  justify-content: center;
`;

const FlexBetween = styled(Flex)`
  justify-content: space-between;
`;

const FlexAlignCenter = styled(Flex)`
  align-items: center;
`;

const FlexCenter = styled(Flex)`
  justify-content: center;
  align-items: center;
`;

export { Flex, FlexJustfiyCenter, FlexBetween, FlexAlignCenter, FlexCenter };
