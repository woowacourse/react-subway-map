import React from 'react';
import Dropdown from 'components/shared/Dropdown/Dropdown';
import Input from 'components/shared/Input/Input';
import Styled from './SectionModal.styles';
import { ButtonType } from 'types';
import TextButton from 'components/shared/TextButton/TextButton';

interface SectionModalProps {
  lineNames: string[];
  stations: string[] | undefined;
}

const SectionModal = ({ lineNames, stations = [] }: SectionModalProps) => {
  const selectLine = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value);
  };

  const selectUpStation = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value);
  };

  const selectDownStation = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value);
  };

  return (
    <>
      <Styled.Container>
        <Dropdown
          labelText="노선 선택"
          defaultOption="노선 선택"
          options={lineNames}
          onSelect={selectLine}
        />
        <Styled.StationInputWrapper>
          <Styled.DropdownWrapper>
            <Dropdown
              labelText="상행역"
              defaultOption="상행역"
              options={stations}
              onSelect={selectUpStation}
            />
          </Styled.DropdownWrapper>
          <Styled.DropdownWrapper>
            <Dropdown
              labelText="하행역"
              defaultOption="하행역"
              options={stations}
              onSelect={selectDownStation}
            />
          </Styled.DropdownWrapper>
        </Styled.StationInputWrapper>
        <Input type="number" labelText="거리" />

        <Styled.ButtonsContainer>
          <TextButton text="취소" styleType={ButtonType.BLANK}></TextButton>
          <TextButton text="확인" styleType={ButtonType.FILLED}></TextButton>
        </Styled.ButtonsContainer>
      </Styled.Container>
    </>
  );
};

export default SectionModal;
