import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLine } from '../../../hooks';
import { RootState } from '../../../store';
import { FullVerticalCenterBox } from '../../../styles/shared';
import { Header } from '../../atoms';
import { LineItem, ListItemContainer, StationItem, StationWrapper } from './SubwayMap.styles';

const SubwayMap = () => {
  const {
    hostState: { host },
  } = useSelector((state: RootState) => {
    return { hostState: state.hostReducer };
  });

  const { lines, getAllLines } = useLine(host);

  useEffect(() => {
    getAllLines();
  }, []);

  return (
    <FullVerticalCenterBox>
      <Header>
        <h3>🚉 전체 보기</h3>
      </Header>

      <ListItemContainer>
        {lines?.map(({ id, name, color, stations }) => (
          <LineItem key={id} color={color}>
            <span>{name}</span>
            <StationWrapper>
              {stations?.map(station => (
                <StationItem key={station.id} color={color}>
                  <p>{station.name}</p>
                </StationItem>
              ))}
            </StationWrapper>
          </LineItem>
        ))}
      </ListItemContainer>
    </FullVerticalCenterBox>
  );
};

export default SubwayMap;
