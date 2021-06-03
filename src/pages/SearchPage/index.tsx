import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import CardLayout from 'components/CardLayout/CardLayout';
import TextButton from 'components/shared/TextButton/TextButton';
import Dropdown from 'components/shared/Dropdown/Dropdown';
import { ButtonSize, ButtonType, Station, User } from 'types';
import useFetch from 'hooks/useFetch';
import { useAppSelector } from 'modules/hooks';
import { API_STATUS, END_POINT } from 'constants/api';
import { ALERT_MESSAGE } from 'constants/messages';
import ROUTE from 'constants/routes';
import Styled from './styles';
import Loading from 'components/shared/Loading/Loading';

const SearchPage = () => {
  const user: User | undefined = useAppSelector((state) => state.authSlice.data);

  if (!user) return <Redirect to={ROUTE.HOME} />;

  const [stations, setStations] = useState<Station[]>([]);
  const [sourceStationId, setSourceStationId] = useState<string>('');
  const [targetStationId, setTargerStationId] = useState<string>('');
  const [distance, setDistance] = useState<string>('0');
  const [extraFare, setExtraFare] = useState<string>('0');
  const [paths, setPaths] = useState<Station[]>([]);
  const { enqueueSnackbar } = useSnackbar();

  const { fetchData: getStationsAsync, loading: getStationsLoading } = useFetch('GET');
  const { fetchData: getPathAsync, loading: getPathLoading } = useFetch('GET');

  const getStations = async () => {
    console.log('fetching...');
    const res = await getStationsAsync(END_POINT.STATIONS);

    if (res.status === API_STATUS.REJECTED) {
      enqueueSnackbar(ALERT_MESSAGE.FAIL_TO_GET_STATIONS);
    } else if (res.status === API_STATUS.FULFILLED) {
      setStations(res.data);
    }
  };

  const searchPath = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const res = await getPathAsync(
      `${END_POINT.PATHS}?source=${sourceStationId}&target=${targetStationId}`,
    );

    if (res.status === API_STATUS.REJECTED) {
      enqueueSnackbar(ALERT_MESSAGE.NO_PATH_AVAILABLE);
    } else if (res.status === API_STATUS.FULFILLED) {
      console.log(res.data);
      setPaths(res.data.stations);
      setDistance(res.data.distance);
      setExtraFare(res.data.fare);
    }
  };

  const stationOptions = stations.map((station) => ({ id: station.id, value: station.name }));

  const isLoading = getStationsLoading || getPathLoading;

  useEffect(() => {
    const fetchStations = async () => {
      await getStations();
    };

    fetchStations();
  }, []);

  return (
    <CardLayout title={'경로 검색'}>
      <Loading isLoading={isLoading} />
      <Styled.FormWrapper onSubmit={searchPath}>
        <Styled.DropdownContainer>
          <Styled.DropdownWrapper>
            <Dropdown
              labelText="출발역"
              defaultOption="출발역"
              value={sourceStationId}
              options={stationOptions}
              onSelect={(event) => setSourceStationId(event.target.value)}
            />
          </Styled.DropdownWrapper>
          <Styled.ArrowIcon>👉</Styled.ArrowIcon>
          <Styled.DropdownWrapper>
            <Dropdown
              labelText="도착역"
              defaultOption="도착역"
              value={targetStationId}
              options={stationOptions}
              onSelect={(event) => setTargerStationId(event.target.value)}
            />
          </Styled.DropdownWrapper>
        </Styled.DropdownContainer>
        <TextButton text="검색" styleType={ButtonType.YELLOW} sizeType={ButtonSize.LARGE} />
      </Styled.FormWrapper>

      <Styled.Divider />
      <Styled.Table>
        <thead>
          <Styled.Tr>
            <Styled.Th colSpan={2}>최단 거리</Styled.Th>
          </Styled.Tr>
        </thead>
        <tbody>
          <Styled.Tr>
            <Styled.Td border={true}>거리</Styled.Td>
            <Styled.Td border={true}>요금</Styled.Td>
          </Styled.Tr>
          <Styled.Tr>
            <Styled.Td>{distance}km</Styled.Td>
            <Styled.Td>{extraFare.toLocaleString()}원</Styled.Td>
          </Styled.Tr>
        </tbody>
      </Styled.Table>
      <Styled.Divider />
      <Styled.PathContainer>
        {paths.map((station) => (
          <Styled.PathItem key={station.id}>{station.name}</Styled.PathItem>
        ))}
      </Styled.PathContainer>
    </CardLayout>
  );
};

export default SearchPage;
