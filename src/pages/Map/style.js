import styled from 'styled-components';
import { Flex } from '../../styles';

export const SubwayMap = styled.ul`
  width: 100%;
`;

export const Container = styled.li`
  margin-bottom: 24px;
`;

export const Name = styled.span`
  margin-left: 8px;
  font-size: var(--size-medium);
  font-weight: var(--weight-semi-bold);
`;

export const Station = styled.span`
  padding: 4px 8px;
  border-radius: 24px;
  margin-bottom: 12px;
`;

export const Section = styled.span`
  position: relative;
  margin-bottom: 12px;
`;

export const Bar = styled.div`
  width: 48px;
  height: 2px;
`;

export const Distance = styled.span`
  position: absolute;
  font-size: var(--size-small);
  left: 4px;
  bottom: 4px;
`;

export const Info = styled.div`
  ${Flex({ items: 'center', wrap: 'wrap' })}
  margin-top: 12px;

  ${Station} {
    border: 3px solid ${({ color }) => color};
  }

  ${Bar} {
    border: 2px solid ${({ color }) => color};
  }
`;
