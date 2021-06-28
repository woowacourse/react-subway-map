import styled from 'styled-components';

import { ButtonSquare } from '../../components';
import { COLOR } from '../../constants';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 70%;
`;

export const StationSelect = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const SearchButton = styled(ButtonSquare)`
  width: 100%;
`;

export const Table = styled.table`
  visibility: ${(props) => (props.isVisible ? 'visible' : 'hidden')};
  display: flex;
  flex-direction: column;
  margin-top: 1.5rem;
  width: 70%;
`;

export const Thead = styled.thead`
  border-top: 1px solid ${COLOR.THEME};
  width: 100%;
`;

export const Tbody = styled.tbody`
  width: 100%;
`;

export const Tr = styled.tr`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 3rem;

  border-bottom: 1px solid ${COLOR.BORDER_DEFAULT};
`;

export const Th = styled.th`
  color: ${COLOR.TEXT.DEFAULT};
`;

export const Td = styled.td`
  color: ${COLOR.TEXT.PARAGRAPH};
`;

export const PathTitle = styled.h3`
  margin-top: 2rem;

  font-size: 1rem;
  color: ${COLOR.TEXT.PARAGRAPH};

  &::before,
  &::after {
    content: '-';
    padding: 0.5rem;
  }
`;

export const Path = styled.ul`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 70%;
  padding: 0.5rem 0;

  line-height: 2rem;

  & li:first-child,
  & li:last-child {
    position: relative;
    border-color: ${COLOR.THEME_STRONG};

    &::before {
      position: absolute;
      top: -1.7rem;
      left: 0;

      font-size: 0.5rem;
      color: ${COLOR.THEME_STRONG};
    }
  }

  & li:first-child::before {
    content: '출발역';
  }

  & li:last-child::before {
    content: '도착역';
  }
`;

export const PathItem = styled.li`
  width: 25%;
  min-width: 3.5rem;
  margin: 1.25rem 0.25rem;

  text-align: center;
  font-size: 0.8rem;
  letter-spacing: -0.05rem;
  border-top: 0.2rem solid ${COLOR.THEME_LIGHT};
  border-bottom: 0.2rem solid ${COLOR.THEME_LIGHT};
`;
