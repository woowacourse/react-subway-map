import React, {
  ChangeEventHandler,
  FormEventHandler,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useSnackbar } from 'notistack';
import { Button, Card, Select } from '../../components';
import * as Styled from './SearchPage.styles';
import { ReactComponent as RightArrowIcon } from '../../assets/icons/arrow-right-solid.svg';
import useSelect from '../../hooks/useSelect';
import API from '../../api';
import { LineStation, SearchResult } from '../../types';
import MESSAGE from '../../constants/message';
import useLine from '../../hooks/useLine';
import useAuth from '../../hooks/useAuth';

const SearchPage = () => {
  const { server } = useAuth();
  const { list: lineList, get: getLineList } = useLine();

  const { enqueueSnackbar } = useSnackbar();

  const { valueAsNumber: upStationId, setValue: setUpStationId } = useSelect('');
  const {
    valueAsNumber: downStationId,
    onChange: onChangeDownStationId,
    setValue: setDownStationId,
  } = useSelect('');
  const [result, setResult] = useState<SearchResult | null>(null);

  const searchableStationList = lineList
    .flatMap((line) => line.stations)
    .reduce((accumulator: LineStation[], currentValue) => {
      if (accumulator.findIndex((item) => item.id === currentValue.id) >= 0) {
        return accumulator;
      }
      return accumulator.concat(currentValue);
    }, []);

  const downStationList = searchableStationList.filter((station) => station.id !== upStationId);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    try {
      const response = await API.get(`/paths?source=${upStationId}&target=${downStationId}`);
      setResult(response.data);
    } catch (error) {
      enqueueSnackbar(error.response.data.message || MESSAGE.ERROR.ROUTE_NOT_EXISTS);
    }
  };

  const handleChangeUpStationId: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const selectedStationId = event.target.value;
    setUpStationId(selectedStationId);

    if (downStationId !== Number(selectedStationId)) return;

    const [firstDownStationId] = downStationList.map((station) => station.id);

    setDownStationId(`${firstDownStationId}`);
  };

  const initializeSelectState = useCallback(() => {
    if (searchableStationList.length > 1 && !upStationId && !downStationId) {
      const [firstStationId, secondStationId] = searchableStationList.map((station) => station.id);
      setUpStationId(`${firstStationId}`);
      setDownStationId(`${secondStationId}`);
    }
  }, [downStationId, searchableStationList, setDownStationId, setUpStationId, upStationId]);

  const updateUpStationId = useCallback(() => {
    const upStationIds = searchableStationList.map((station) => station.id);
    const [firstUpStationId] = upStationIds;

    if (upStationId && downStationId && !upStationIds.includes(upStationId)) {
      setUpStationId(`${firstUpStationId}`);
    }
  }, [downStationId, searchableStationList, setUpStationId, upStationId]);

  const updateDownStationId = useCallback(() => {
    const downStationIds = downStationList.map((station) => station.id);
    const [firstDownStationId] = downStationIds;

    if (upStationId && downStationId && !downStationIds.includes(downStationId)) {
      setDownStationId(`${firstDownStationId}`);
    }
  }, [downStationId, downStationList, setDownStationId, upStationId]);

  useEffect(() => {
    initializeSelectState();
  }, [initializeSelectState]);

  useEffect(() => {
    updateUpStationId();
  }, [updateUpStationId]);

  useEffect(() => {
    updateDownStationId();
  }, [updateDownStationId]);

  useEffect(() => {
    getLineList();
  }, [getLineList, server]);

  return (
    <Styled.SearchPage>
      <Styled.Container>
        <Card>
          <Styled.HeaderText>경로 검색</Styled.HeaderText>
          <Styled.Form onSubmit={handleSubmit}>
            <Styled.SelectWrapper>
              <Select labelText="출발역" value={upStationId} onChange={handleChangeUpStationId}>
                {searchableStationList.map((station) => (
                  <option key={station.id} value={station.id}>
                    {station.name}
                  </option>
                ))}
              </Select>
              <RightArrowIcon />
              <Select labelText="도착역" value={downStationId} onChange={onChangeDownStationId}>
                {downStationList?.map((station) => (
                  <option key={station.id} value={station.id}>
                    {station.name}
                  </option>
                ))}
              </Select>
            </Styled.SelectWrapper>
            <Button fullWidth>검색</Button>
          </Styled.Form>

          <Styled.Control>
            <Styled.Divider />
          </Styled.Control>

          {result && (
            <Styled.Result>
              <Styled.ResultHeader>최단 거리</Styled.ResultHeader>
              <Styled.ResultRow>
                <Styled.ResultItem>거리</Styled.ResultItem>
                <Styled.ResultItem>요금</Styled.ResultItem>
              </Styled.ResultRow>
              <Styled.ResultRow>
                <Styled.ResultItem role="cell">{result.distance}km</Styled.ResultItem>
                <Styled.ResultItem role="cell">
                  {result.defaultFare.toLocaleString()}원
                </Styled.ResultItem>
              </Styled.ResultRow>

              <Styled.DetailRoute>
                {result.stations.map((station, index) => (
                  <Styled.Station key={station.id}>
                    <Styled.StationName role="listitem">{station.name}</Styled.StationName>
                    {index < result.stations.length - 1 && (
                      <Styled.ArrowWrapper key={`${station.id}-arrow`}>
                        <RightArrowIcon />
                      </Styled.ArrowWrapper>
                    )}
                  </Styled.Station>
                ))}
              </Styled.DetailRoute>
            </Styled.Result>
          )}
        </Card>
      </Styled.Container>
    </Styled.SearchPage>
  );
};

export default SearchPage;
