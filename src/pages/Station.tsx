import Button from '@shared/Button/Button';
import Container from '@shared/Container/Container';
import Input from '@shared/Input/Input';
import Title from '@shared/Title/Title';
import ListItem from '@units/ListItem/ListItem';
import subwayImg from 'assets/images/subway.png';
import MESSAGE from 'constants/message';
import PATH from 'constants/PATH';
import useRedirect from 'hooks/useRedirect';
import React, { useEffect, useState } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { addStationAsync, deleteStationAsync, getStationAsync } from 'redux/stationSlice';
import { RootState } from 'redux/store';
import { StationInterface } from 'types';

const Station = () => {
  useRedirect(PATH.LOGIN);

  const dispatch = useDispatch();

  // TODO useAppSelector 추상화 하기
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
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
      <form className="flex items-center mb-8" onSubmit={handleSubmit}>
        <Input
          className="mr-4 w-full"
          imgUrl={subwayImg}
          placeholder="역 이름을 입력해주세요"
          title="역 이름을 입력해주세요"
          value={name}
          onChange={handleName}
        />
        <Button className="shadow-md" text="추가" />
      </form>
      <hr />
      {/* TODO [백엔드] 백엔드 크루들에게 역 정렬 순서를 생성 순으로 해달라고 요청하기 */}
      {stations?.map((station) => (
        <ListItem key={station.id} id={station.id} title={station.name} onDelete={handleDelete} />
      ))}
    </Container>
  );
};

export default Station;
