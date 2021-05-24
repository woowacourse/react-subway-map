import styled from 'styled-components';

import { COLOR } from '../../../constants/style';

export const TopLine = styled.div`
  width: 100%;
  height: 1rem;
  background-color: ${COLOR.THEME};
  border-radius: 0.25rem 0.25rem 0 0;
  border-color: ${COLOR.THEME};
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3rem;
  width: 100%;
  max-width: 50rem;
  min-height: 10rem;
  background-color: #fff;
  border: 0.0625rem solid ${COLOR.BORDER_DEFAULT};
  border-radius: 0 0 0.25rem 0.25rem;
`;

export const Heading = styled.h2`
  margin: 1rem 0;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
