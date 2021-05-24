import styled from '@emotion/styled';
import { FlexCenterBox } from '../../../styles/css';

const Container = styled.div`
  width: 100%;
  ${FlexCenterBox};
  flex-direction: column;

  & > * {
    width: 100%;
  }
`;

const Footer = styled.span`
  text-align: center;

  & > a {
    font-weight: bold;
    color: #2a9df4;
  }
`;

export { Container, Footer };
