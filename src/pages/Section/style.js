import styled from 'styled-components';

import { ButtonRound, ButtonSquare, Select } from '../../components';
import { COLOR } from '../../constants';

export const List = styled.ul`
  width: 95%;

  margin-top: 1.5rem;
`;

export const Item = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  justify-content: center;
  align-items: center;
  padding-top: 0.5rem;

  line-height: 2rem;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const Flex = styled.span`
  display: flex;
  align-items: center;
`;

export const Name = styled.span`
  color: ${COLOR.TEXT.DEFAULT};
  letter-spacing: -0.01rem;
`;

export const ColorBox = styled.span`
  position: relative;
  margin-left: 1rem;
  margin-bottom: 0.2rem;
  width: 1.2rem;
  height: 1.2rem;

  border-radius: 50%;
  background-color: ${(props) => props.bgColor};
  border: 0.1rem solid ${COLOR.BORDER_DEFAULT};

  &::before {
    position: absolute;
    content: attr(content);
    top: -0.5rem;
    left: 0.25rem;
    width: 0.5rem;
    text-align: center;

    color: #fff;
    font-size: 0.5rem;
  }
`;

export const Detail = styled.div`
  display: flex;
  align-self: flex-start;
  flex-direction: column;
  align-items: center;
  margin: 0.25rem;
  padding-left: 0.5rem;
  width: auto;
`;

export const Distance = styled.span`
  font-size: 0.5rem;
  color: ${COLOR.TEXT.PARAGRAPH};
  letter-spacing: -0.01rem;
`;

export const AddButton = styled(ButtonRound)`
  align-self: flex-end;
  margin-bottom: 1rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const StationSelect = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const ButtonControl = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  /* margin-top: 1rem; */
  width: 100%;
`;

export const CancelButton = styled(ButtonSquare)`
  background-color: transparent;
  box-shadow: none;

  &:hover {
    background-color: #eee;
    box-shadow: 0.25rem 0.25rem 0.5rem rgba(0, 0, 0, 0.15);
  }
`;

export const LineSelectBox = styled(Select)`
  width: 100%;
  margin: 1rem 0 0.75rem;

  & select {
    width: 100%;
  }
`;

export const InvalidMessage = styled.div`
  height: 1.5rem;

  color: ${COLOR.ERROR};
  font-size: 0.85rem;
`;
