import Button from '../../components/@common/Button/Button.styles';
import Template from '../../components/@common/Template/Template';
import Title from '../../components/@common/Title/Title.styles';
import { APISelectList } from './APISelectPage.styles';
import { currentAPI } from '../../API/API';
import { VFC } from 'react';
import { RouteComponentProps } from 'react-router';

const URL = {
  BETTER: 'https://subway-fare-mission.kro.kr',
  KEVIN: 'https://jipark.p-e.kr', // 로그인 시 400 error
  MUNGTO: 'https://mungto-subway.o-r.kr',
  PIKA: 'https://pika-subway-fare.kro.kr',
};

const APISelectPage: VFC<RouteComponentProps> = ({ history }) => {
  const selectAPI = (baseUrl: string) => {
    currentAPI.baseUrl = baseUrl;
    history.push('/login');
  };

  return (
    <Template type="vertical">
      <Title>API를 선택해주세요.</Title>
      <APISelectList>
        <li>
          <Button type="button" onClick={() => selectAPI(URL.BETTER)}>
            배럴
          </Button>
        </li>
        <li>
          <Button type="button" onClick={() => selectAPI(URL.KEVIN)}>
            케빈
          </Button>
        </li>
        <li>
          <Button type="button" onClick={() => selectAPI(URL.MUNGTO)}>
            멍토
          </Button>
        </li>
        <li>
          <Button type="button" onClick={() => selectAPI(URL.PIKA)}>
            피카
          </Button>
        </li>
      </APISelectList>
    </Template>
  );
};

export default APISelectPage;
