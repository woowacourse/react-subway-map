import Button from '../../components/@common/Button/Button.styles';
import Template from '../../components/@common/Template/Template';
import Title from '../../components/@common/Title/Title.styles';
import { APISelectList } from './APISelectPage.styles';
import { VFC } from 'react';
import { RouteComponentProps } from 'react-router';
import useAPISelect from '../../service/hooks/useAPISelect';

const APISelectPage: VFC<RouteComponentProps> = () => {
  const { selectAPI } = useAPISelect();

  return (
    <Template type="vertical">
      <Title>API를 선택해주세요.</Title>
      <APISelectList>
        {/* <li>
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
          <Button type="button" onClick={() => selectAPI('PIKA')}>
            피카
          </Button>
        </li> */}
        <li>
          <Button type="button" onClick={() => selectAPI('MUNGTO')}>
            멍토
          </Button>
        </li>
      </APISelectList>
    </Template>
  );
};

export default APISelectPage;
