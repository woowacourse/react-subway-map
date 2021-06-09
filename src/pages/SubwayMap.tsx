import Container from '@shared/Container/Container';
import Title from '@shared/Title/Title';
import MapItem from '@units/MapItem/MapItem';
import { borderColor } from 'constants/color';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllLinesAsync } from 'redux/lineSlice';
import { useAppSelector } from 'redux/store';
import { LineInterface } from 'types';

const SubwayMap = () => {
  const dispatch = useDispatch();
  const lines: LineInterface[] | null = useAppSelector((state) => state.line.lines);

  useEffect(() => {
    dispatch(getAllLinesAsync());
  }, [dispatch]);

  return (
    <Container className="mb-16">
      <Title className="mb-8" text="🗺 전체 보기" />
      {lines?.map((line) => (
        <Container key={line.id} className={`mt-6 w-full ${borderColor[line.color]}`}>
          <div className={`flex justify-center items-center  rounded-2xl py-1 mb-6 ${line.color}`}>
            <Title text={line.name} textSize="text-xl" className="text-center" />
          </div>
          <div className="flex">
            <MapItem color={line.color} stations={line.stations} />
          </div>
        </Container>
      ))}
    </Container>
  );
};

export default SubwayMap;
