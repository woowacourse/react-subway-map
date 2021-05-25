import Button from '@shared/Button/Button';
import Container from '@shared/Container/Container';
import Input from '@shared/Input/Input';
import Title from '@shared/Title/Title';
import ListItem from '@units/ListItem/ListItem';
import subwayImg from 'assets/images/subway.png';
import PATH from 'constants/PATH';
import useRedirect from 'hooks/useRedirect';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addStationAsync, deleteStationAsync, getStationAsync } from 'redux/stationSlice';
import { StationInterface } from 'types';

interface Stations {
  station: {
    stations: StationInterface[] | null;
  };
}

const Station = () => {
  useRedirect(PATH.LOGIN);

  const dispatch = useDispatch();

  // TODO stations의 타입이 unknown으로 추정되지 않도록 수정해야 함.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const stations: any = useSelector<Stations>((state) => state.station.stations);

  const [name, setName] = useState('');

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setName(value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await dispatch(addStationAsync({ name }));

      alert('역 추가에 성공하였습니다.');
      setName('');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await dispatch(deleteStationAsync({ id }));

      alert('역 삭제에 성공하였습니다.');
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
          imgUrl={subwayImg}
          placeholder="역 이름을 입력해주세요"
        />
        <Button className="shadow-md" text="추가" />
      </form>
      <hr />
      {/* TODO [백엔드] 백엔드 크루들에게 역 정렬 순서를 생성 순으로 해달라고 요청하기 */}
      {stations?.map((station: StationInterface) => (
        <ListItem onDelete={handleDelete} key={station.id} id={station.id} title={station.name} />
      ))}
    </Container>
  );
};

export default Station;
