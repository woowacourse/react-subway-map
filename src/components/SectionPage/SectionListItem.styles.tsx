import styled from '@emotion/styled';
import { COLOR } from '../../constants/styleConstant';
import { Props } from './SectionListItem';

type NameProp = Pick<Props, 'lineColor'>;

export const SectionListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  padding: 1rem 1.5rem;
  width: 100%;
  position: relative;
`;

export const Name = styled.div<NameProp>`
  width: fit-content;
  margin-right: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 3rem;
  border: 0.25rem solid ${({ lineColor }) => (lineColor ? lineColor : COLOR.MINT_500)};
`;

export const NameWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const Distance = styled.div`
  font-size: 0.75rem;
  text-align: center;
`;

export const ButtonContainer = styled.div`
  display: flex;
`;

export const ButtonWrapper = styled.div`
  width: 1rem;
  height: 1rem;
  margin-left: 1rem;
`;

export const Button = styled.img`
  width: 100%;
  height: 100%;
  cursor: pointer;
  opacity: 0.4;
  &:hover {
    opacity: 1;
  }
`;
