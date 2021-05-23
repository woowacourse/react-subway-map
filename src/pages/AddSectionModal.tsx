import Container from '@shared/Container/Container';
import Input from '@shared/Input/Input';
import SelectInput from '@shared/SelectInput/SelectInput';
import Title from '@shared/Title/Title';
import React from 'react';
import arrowImg from 'assets/images/arrow.png';
import closeImg from 'assets/images/close.png';
import Button from '@shared/Button/Button';
import ImageButton from '@shared/ImageButton/ImageButton';

const AddSectionModal = () => {
  return (
    <div className="z-10 w-full h-full">
      <Container>
        <div className="flex justify-end -mb-4">
          <ImageButton
            imgUrl={closeImg}
            bgColor="bg-gray-100"
            size="w-8 h-8"
            imgSize="w-4"
            hoverBgColor="bg-gray-200"
          />
        </div>
        <Title text="🔁  구간 추가" className="mb-8 text-center" />
        <Input title="노선 이름" placeholder="노선 이름을 입력해주세요" className="mb-8 w-full" />
        <div className="flex items-center mb-8">
          <SelectInput title="상행역" className="w-full">
            <option>분당선</option>
          </SelectInput>
          <img className="mx-2 w-8 h-8" src={arrowImg} alt="arrowImg" />
          <SelectInput title="하행역" className="w-full">
            <option>분당선</option>
          </SelectInput>
        </div>
        <Input title="거리" placeholder="거리를 입력해주세요" className="mb-8 w-full" />
        <div className="flex justify-end">
          <Button text="확인" />
        </div>
      </Container>
    </div>
  );
};

export default AddSectionModal;
