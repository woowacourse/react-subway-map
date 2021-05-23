import Container from '@shared/Container/Container';
import ImageButton from '@shared/ImageButton/ImageButton';
import SelectInput from '@shared/SelectInput/SelectInput';
import Title from '@shared/Title/Title';
import addImg from 'assets/images/add.png';
import React from 'react';

const Section = () => {
  return (
    <Container>
      <div className="flex items-center justify-between mb-8">
        <Title text="🔁 지하철 구간 관리" />
        <ImageButton imgUrl={addImg} />
      </div>

      <SelectInput title="조회하실 노선을 선택해주세요." className="w-full">
        <option>분당선</option>
        <option>신분당선</option>
        <option>2호선</option>
      </SelectInput>
    </Container>
  );
};

export default Section;
