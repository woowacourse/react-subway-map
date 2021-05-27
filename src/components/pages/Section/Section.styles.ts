import styled from '@emotion/styled';
import { FlexCenterBox } from '../../../styles/css';

// TODO: 모든 페이지에서 중복되는 Container 추출하기
const Container = styled.div`
  width: 100%;
  ${FlexCenterBox};
  flex-direction: column;

  & > * {
    width: 100%;
  }
`;

const SelectContainer = styled.div`
  padding: 2rem 4rem;

  & > select {
    width: 100%;
  }
`;

export { Container, SelectContainer };
