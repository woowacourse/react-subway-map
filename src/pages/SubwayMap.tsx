import Container from '@shared/Container/Container';
import Title from '@shared/Title/Title';
import ListItem from '@units/ListItem/ListItem';
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
        <h1>{line.name}</h1>
      ))}
    </Container>
  );
};

export default SubwayMap;
