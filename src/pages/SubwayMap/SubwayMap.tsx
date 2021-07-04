import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import CardTemplate from '../../components/@common/CardTemplate/CardTemplate';
import Dimmed from '../../components/@common/Dimmed/Dimmed';
import Loading from '../../components/@common/Loading/Loading';
import { PAGE_INFO } from '../../constants/appInfo';
import useThemeColor from '../../hooks/useThemeColor';
import useUpdateEffect from '../../hooks/useUpdateEffect';
import { loadLines } from '../../redux/lineSlice';
import { RootState, useAppDispatch } from '../../redux/store';
import { SubwayMapContainer, SubwayMapList, SubwayMapListItem } from './SubwayMap.styles';

const SubwayMap = (): JSX.Element => {
  const themeColor = useThemeColor();
  const { lines, isLoading, errorMessage } = useSelector((state: RootState) => state.line);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadLines());
  }, []);

  useUpdateEffect(() => {
    if (errorMessage === '') {
      return;
    }

    alert(errorMessage);
  }, [errorMessage]);

  return (
    <CardTemplate templateColor={themeColor[400]} titleText={PAGE_INFO.SUBWAY_MAP.text}>
      {isLoading && (
        <Dimmed backgroundColor="rgba(255, 255, 255, 0.2)">
          <Loading />
        </Dimmed>
      )}

      {lines.length > 0 && (
        <SubwayMapContainer>
          {lines.map((line) => (
            <CardTemplate
              key={line.id}
              templateColor={line.color}
              isColoredTitle={true}
              titleText={line.name}
              titleSize="sm"
            >
              <SubwayMapList>
                {line.stations.map((station) => (
                  <SubwayMapListItem key={station.id} lineColor={line.color}>
                    {station.name}
                  </SubwayMapListItem>
                ))}
              </SubwayMapList>
            </CardTemplate>
          ))}
        </SubwayMapContainer>
      )}
    </CardTemplate>
  );
};

export default SubwayMap;
