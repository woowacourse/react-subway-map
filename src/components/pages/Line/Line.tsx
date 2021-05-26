import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { ROUTE } from '../../../constants';
import { useServerAPI } from '../../../hooks';
import { RootState } from '../../../store';
import { ILineRes } from '../../../type';
import { Button, Header } from '../../atoms';
import { Container, LineListContainer, LineItemWithCircle } from './Line.styles';

const Line = () => {
  const {
    signedUser: { id: signedUserId },
    hostState: { host },
  } = useSelector((state: RootState) => {
    return { signedUser: state.signedUserReducer, hostState: state.hostReducer };
  });

  const {
    allData: lines,
    getAllData: getAllLines,
    getAllDataResponse: getAllLineResponse,
  } = useServerAPI<ILineRes>(`${host}/lines`);

  if (!signedUserId) {
    window.alert('로그인이 필요합니다.');
    return <Redirect to={ROUTE.LOGIN} />;
  }

  useEffect(() => {
    getAllLines();
  }, []);

  useEffect(() => {
    if (getAllLineResponse?.isError === true) {
      window.alert('노선 조회에 실패했습니다.');
    }
  }, [getAllLineResponse]);

  return (
    <Container>
      <Header hasExtra>
        <h3>노선 관리</h3>
        <Button>노선 추가</Button>
      </Header>

      <LineListContainer>
        {lines?.map(({ id, name, color }) => {
          return (
            <LineItemWithCircle
              key={id}
              content={name}
              onClickModify={() => {
                window.alert('modify');
              }}
              onClickDelete={() => {
                window.alert('delete');
              }}
              option={{ color }}
            />
          );
        })}
      </LineListContainer>
    </Container>
  );
};

export default Line;
