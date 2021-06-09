import Button from '@shared/Button/Button';
import Container from '@shared/Container/Container';
import Input from '@shared/Input/Input';
import Title from '@shared/Title/Title';
import ListItem from '@units/ListItem/ListItem';
import subwayImg from 'assets/images/subway.png';
import MESSAGE from 'constants/message';
import PATH from 'constants/PATH';
import useCheckAuth from 'hooks/useCheckAuth';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addStationAsync, deleteStationAsync, getStationAsync } from 'redux/stationSlice';
import { useAppSelector } from 'redux/store';
import { StationInterface } from 'types';

const Station = () => {
  useCheckAuth(PATH.LOGIN);

  const dispatch = useDispatch();
  const stations: StationInterface[] | null = useAppSelector((state) => state.station.stations);

  const [name, setName] = useState('');

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setName(value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await dispatch(addStationAsync({ name }));

      alert(MESSAGE.STATION.ADD_SUCCESS);
      setName('');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDelete = async (id: number, station: string) => {
    if (!window.confirm(MESSAGE.COMMON.DELETE_CONFIRM(station))) {
      return;
    }

    try {
      await dispatch(deleteStationAsync({ id }));
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    dispatch(getStationAsync());
  }, [dispatch]);

  return (
    <Container className="mb-16">
      <Title className="mb-8" text="🚉 지하철 역 관리" />
      <form onSubmit={handleSubmit} className="flex items-center mb-8">
        <Input
          onChange={handleName}
          value={name}
          className="mr-4 w-full"
          title="역 이름을 입력해주세요"
          placeholder="역 이름을 입력해주세요"
        >
          <img className="w-6 h-6" src={subwayImg} />
        </Input>
        <Button className="shadow-md">
          <span>추가</span>
        </Button>
      </form>
      <hr />
      {stations?.map((station) => (
        <ListItem onDelete={handleDelete} key={station.id} id={station.id} title={station.name} />
      ))}
    </Container>
  );
};

export default Station;
