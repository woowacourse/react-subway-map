import styled from '@emotion/styled';

const FlexCenterBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FullVerticalCenterBox = styled(FlexCenterBox)`
  width: 100%;
  flex-direction: column;

  & > * {
    width: 100%;
  }
`;

const ScrollBox = styled.div`
  max-height: 500px;
  overflow-y: auto;
`;

export { FlexCenterBox, FullVerticalCenterBox, ScrollBox };
