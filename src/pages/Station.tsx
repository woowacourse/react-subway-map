import Button from '@shared/Button/Button';
import Container from '@shared/Container/Container';
import Input from '@shared/Input/Input';
import Title from '@shared/Title/Title';
import InputContainer from '@units/InputContainer/InputContainer';
import ListItem from '@units/ListItem/ListItem';
import subwayImg from 'assets/images/subway.png';
import MESSAGE from 'constants/message';
import useChangeEvent from 'hooks/useChangeEvent';
import useData from 'hooks/useData';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addStationAsync, deleteStationAsync, getStationAsync } from 'redux/stationSlice';

const Station = () => {
  const dispatch = useDispatch();
  const { stations } = useData();
  const { value: name, setValue: setName, onChange: onNameChange } = useChangeEvent('');

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
        <InputContainer className="mr-4 w-full" imgUrl={subwayImg}>
          <Input
            placeholder="역 이름을 입력해주세요"
            title="역 이름을 입력해주세요"
            value={name}
            onChange={onNameChange}
          />
        </InputContainer>
        <Button className="shadow-md" text="추가" />
      </form>
      <hr />
      {stations?.map((station) => (
        <ListItem key={station.id} id={station.id} title={station.name} onDelete={handleDelete} />
      ))}
    </Container>
  );
};

export default Station;
