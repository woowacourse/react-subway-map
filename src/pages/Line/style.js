import styled from 'styled-components';

import { ButtonRound, ButtonSquare } from '../../components';
import { COLOR } from '../../constants';

export const List = styled.ul`
  width: 90%;
`;

export const Item = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;

  line-height: 2rem;
  border-bottom: 0.125rem solid ${COLOR.BORDER_DEFAULT};
`;

export const Name = styled.span`
  flex-grow: 1;
  padding-left: 1rem;

  color: ${COLOR.TEXT.DEFAULT};
  letter-spacing: -0.01rem;
`;

export const AddButton = styled(ButtonRound)`
  align-self: flex-end;
  margin-bottom: 1rem;
`;

export const ColorBox = styled.div`
  margin-bottom: 0.2rem;
  width: 1rem;
  height: 1rem;

  border-radius: 50%;
  background-color: ${(props) => props.bgColor};
`;

export const StationsDetail = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  margin-right: 1rem;
`;

export const StationName = styled.span`
  display: inline-block;
  max-width: 60%;
  padding: 0.5rem;

  text-align: left;
  line-height: 1;
`;

export const Flex = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin: 0 0.5rem;
`;

export const TotalDistance = styled.span`
  font-size: 0.5rem;
  line-height: 0.5rem;
  padding-bottom: 0.2rem;
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
  margin-top: 1rem;
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
