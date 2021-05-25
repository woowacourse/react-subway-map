import Button from '@shared/Button/Button';
import Container from '@shared/Container/Container';
import Input from '@shared/Input/Input';
import Title from '@shared/Title/Title';
import ListItem from '@units/ListItem/ListItem';
import subwayImg from 'assets/images/subway.png';
import PATH from 'constants/PATH';
import useRedirect from 'hooks/useRedirect';
import React from 'react';

const Station = () => {
  useRedirect(PATH.LOGIN);

  return (
    <Container className="mb-16">
      <Title className="mb-8" text="🚉 지하철 역 관리" />
      <div className="flex items-center mb-8">
        <Input
          className="mr-4 w-full"
          title="역 이름을 입력해주세요"
          imgUrl={subwayImg}
          placeholder="역 이름을 입력해주세요"
        />
        <Button className="shadow-md" text="추가" />
      </div>
      {/* dummy data */}
      <hr />
      <ListItem title="강남역" />
      <ListItem title="강남역" />
      <ListItem title="강남역" />
    </Container>
  );
};

export default Station;
