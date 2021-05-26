import Container from '@shared/Container/Container';
import ImageButton from '@shared/ImageButton/ImageButton';
import SelectInput from '@shared/SelectInput/SelectInput';
import Title from '@shared/Title/Title';
import ListItem from '@units/ListItem/ListItem';
import addImg from 'assets/images/add.png';
import PATH from 'constants/PATH';
import useRedirect from 'hooks/useRedirect';
import React, { useEffect, useState } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { getLinesAsync, getSelectedLineAsync } from 'redux/lineSlice';
import { RootState } from 'redux/store';
import { LineInterface, SelectedLineInterface } from 'types';

const Section = () => {
  useRedirect(PATH.LOGIN);

  const dispatch = useDispatch();

  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const lines: LineInterface[] | null = useAppSelector((state) => state.line.lines);
  const selectedLine: SelectedLineInterface | null = useAppSelector((state) => state.line.selectedLine);

  const [selectedLineId, setSelectedLineId] = useState(0);

  const handleLineChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // TODO as HTMLElement 를 사용하지 않고 event.target의 value를 얻는 방법
    const target = event.target as HTMLSelectElement;

    setSelectedLineId(Number(target.value));
  };

  const handleDelete = () => {
    // console.log('dedlete');
  };

  useEffect(() => {
    dispatch(getLinesAsync());
  }, [dispatch]);

  useEffect(() => {
    if (selectedLineId) {
      dispatch(getSelectedLineAsync({ id: selectedLineId }));
    }
  }, [selectedLineId]);

  return (
    <>
      <Container>
        <div className="flex items-center justify-between mb-8">
          <Title text="🔁 지하철 구간 관리" />
          <ImageButton imgUrl={addImg} />
        </div>

        <SelectInput onChange={handleLineChange} title="조회하실 노선을 선택해주세요." className="w-full">
          {lines?.map((line) => (
            <option key={line.id} value={String(line.id)}>
              {line.name}
            </option>
          ))}
        </SelectInput>
        {selectedLine && (
          <Container className={`mt-6 w-full ${`border-${selectedLine.color.substr(3)}`}`}>
            <div className={`flex justify-center items-center  rounded-2xl py-1 mb-3 ${selectedLine.color}`}>
              <Title text={selectedLine.name} textSize="text-xl" className="text-center" />
            </div>
            {selectedLine?.stations.map((station) => (
              <ListItem
                onDelete={handleDelete}
                key={station.id}
                id={station.id}
                title={station.name}
                itemColor={selectedLine.color}
              />
            ))}
          </Container>
        )}
      </Container>
      {/* <AddSectionModal /> */}
    </>
  );
};

export default Section;
