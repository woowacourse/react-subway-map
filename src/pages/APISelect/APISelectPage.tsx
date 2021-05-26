import Button from '../../components/@common/Button/Button.styles';
import Template from '../../components/@common/Template/Template';
import Title from '../../components/@common/Title/Title.styles';
import { APISelectList } from './APISelectPage.styles';
import { currentAPI } from '../../API/API';
import { VFC } from 'react';
import { RouteComponentProps } from 'react-router';
import { useAppDispatch } from '../../state/store';
import { APIAction } from '../../state/slices/API';

type APIName = 'PIKA' | 'MUNGTO' | 'BETTER' | 'KEVIN';

const URL = {
  BETTER: 'https://subway-fare-mission.kro.kr',
  KEVIN: 'https://jipark.p-e.kr',
  MUNGTO: 'https://mungto-subway.o-r.kr',
  PIKA: 'https://pika-subway-fare.kro.kr',
};

const APISelectPage: VFC<RouteComponentProps> = ({ history }) => {
  const dispatch = useAppDispatch();
  const selectAPI = (name: APIName) => {
    currentAPI.baseUrl = URL[name];
    dispatch(APIAction.setName(name));
    history.push('/login');
  };

  return (
    <Template type="vertical">
      <Title>API를 선택해주세요.</Title>
      <APISelectList>
        <li>
          <Button type="button" onClick={() => selectAPI('BETTER')}>
            배럴
          </Button>
        </li>
        <li>
          <Button type="button" onClick={() => selectAPI('KEVIN')}>
            케빈
          </Button>
        </li>
        <li>
          <Button type="button" onClick={() => selectAPI('MUNGTO')}>
            멍토
          </Button>
        </li>
        <li>
          <Button type="button" onClick={() => selectAPI('PIKA')}>
            피카
          </Button>
        </li>
      </APISelectList>
    </Template>
  );
};

export default APISelectPage;
