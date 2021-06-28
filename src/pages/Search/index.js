import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { useSnackbar } from 'notistack';

import { useStation, useCookies } from '../../hooks';
import { Section, Select, IconArrowLTR } from '../../components';
import { SearchButton, Form, StationSelect, Path, PathTitle, PathItem, Table, Tbody, Td, Tr, Th, Thead } from './style';
import { requestGet, getFormattedNumber } from '../../utils';
import { COLOR, SEARCH } from '../../constants';

export const SearchPage = () => {
  const { endpoint, accessToken } = useCookies();
  const { stations, requestGetStations } = useStation();
  const { enqueueSnackbar } = useSnackbar();
  const [result, setResult] = useState(null);

  const handleSearchPath = async (e) => {
    e.preventDefault();

    const { source, target } = e.target;

    try {
      const response = await requestGet({
        url: `${endpoint}/paths?source=${source.value}&target=${target.value}`,
        accessToken,
      });

      if (response.status !== 200) {
        throw new Error();
      }

      const body = await response.json();

      setResult(body);
    } catch (e) {
      console.error(e);
      enqueueSnackbar(SEARCH.GET_FAIL);
    }
  };

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    requestGetStations();
  }, []);

  return (
    <Section heading="경로 탐색">
      <Form onSubmit={handleSearchPath}>
        <StationSelect>
          <Select
            id="source"
            name="source"
            optionHead="출발역"
            options={stations}
            selectProps={{ style: { width: '8.5rem' } }}
          />
          <IconArrowLTR />
          <Select
            id="target"
            name="target"
            optionHead="도착역"
            options={stations}
            selectProps={{ style: { width: '8.5rem' } }}
          />
        </StationSelect>
        <SearchButton>검색</SearchButton>
      </Form>
      <Table isVisible={!!result}>
        <Thead>
          <Tr>
            <Th>거리</Th>
            <Th>요금</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>{getFormattedNumber(result?.distance)} km</Td>
            <Td>{getFormattedNumber(result?.fare)} 원</Td>
          </Tr>
        </Tbody>
      </Table>

      {result && (
        <>
          <PathTitle>경로 보기</PathTitle>
          <Path>
            {result?.stations?.map((station, index, self) => {
              const isLast = index === self.length - 1;

              return (
                <Station key={station.id} hasArrow={!isLast}>
                  {station.name}
                </Station>
              );
            })}
          </Path>
        </>
      )}
    </Section>
  );
};

function Station(props) {
  const { children, hasArrow } = props;

  return (
    <>
      <PathItem>{children}</PathItem>
      {hasArrow && <IconArrowLTR color={COLOR.ICON_LIGHT} />}
    </>
  );
}

Station.propTypes = {
  children: PropTypes.node.isRequired,
  hasArrow: PropTypes.bool.isRequired,
};
