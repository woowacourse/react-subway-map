import Container from '@shared/Container/Container';
import Title from '@shared/Title/Title';
import MapItem from '@units/mapItem/mapItem';
import COLORS from 'constants/color';
import { useData } from 'hooks';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllLinesAsync } from 'redux/lineSlice';

const Map = () => {
  const dispatch = useDispatch();
  const { lines } = useData();

  useEffect(() => {
    dispatch(getAllLinesAsync());
  }, []);

  return (
    <Container className="mb-16">
      <Title className="mb-8" text="🚆 전체 보기" />
      {lines?.map((line) => (
        <Container key={line.id} className={`mb-8 w-full ${COLORS[line.color].borderColor}`}>
          <Title className="text-center" text={line.name} textSize="text-xl" />
          <div className="flex justify-center">
            <MapItem color={line.color} items={line.stations} />
          </div>
        </Container>
      ))}
    </Container>
  );
};

export default Map;
