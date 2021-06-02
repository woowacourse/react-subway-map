import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useAppSelector } from 'modules/hooks';
import useFetch from 'hooks/useFetch';
import Loading from 'components/shared/Loading/Loading';
import ROUTE from 'constants/routes';
import { API_STATUS, END_POINT } from 'constants/api';
import { ALERT_MESSAGE } from 'constants/messages';
import { Line, Station, User } from 'types';
import Styled from './styles';

const MapPage = () => {
  const user: User | undefined = useAppSelector((state) => state.authSlice.data);

  if (!user) return <Redirect to={ROUTE.HOME} />;

  const { fetchData: getLinesAsync, loading: getLinesLoading } = useFetch('GET');
  const [lines, setLines] = useState<Line[]>([]);
  const [focusedStation, setFocusedStation] = useState<Station>();

  const { enqueueSnackbar } = useSnackbar();

  const getLines = async () => {
    const res = await getLinesAsync(END_POINT.LINES);

    if (res.status === API_STATUS.REJECTED) {
      enqueueSnackbar(ALERT_MESSAGE.FAIL_TO_GET_STATIONS);
    } else if (res.status === API_STATUS.FULFILLED) {
      setLines(res.data.reverse());
    }
  };

  const isTransfer = (station: Station) => station.includedLines.length > 1;

  const checkSameStations = (targetStation: Station) => {
    if (!isTransfer(targetStation)) return;

    setFocusedStation(targetStation);
  };

  useEffect(() => {
    const fetchLines = async () => {
      await getLines();
    };

    fetchLines();
  }, []);

  return (
    <Styled.Container>
      <Loading isLoading={getLinesLoading} />
      {lines.map((line) => (
        <Styled.LineItem key={line.id}>
          <Styled.LineName color={line.color}>{line.name}</Styled.LineName>
          {line.stations.map((station) => (
            <Styled.StationItem
              key={`${line.id}-${station.id}`}
              isTransfer={isTransfer(station)}
              isFocused={focusedStation?.id === station.id}
              color={line.color}
              onMouseOver={() => checkSameStations(station)}
              onMouseLeave={() => setFocusedStation(undefined)}
            >
              <Styled.StationName>{station.name}</Styled.StationName>
              <Styled.StationConnector color={line.color}>
                <Styled.StationDot>
                  {isTransfer(station) && (
                    <svg width="20" height="20">
                      <circle cx="8" cy="8" r="4" fill="#333" />
                    </svg>
                  )}
                </Styled.StationDot>
              </Styled.StationConnector>
            </Styled.StationItem>
          ))}
        </Styled.LineItem>
      ))}
    </Styled.Container>
  );
};

export default MapPage;
