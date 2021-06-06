import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ROUTE } from '../../../constants/api';
import { RootState } from '../../../modules';
import * as S from './Navigation.styles';

const Navigation = () => {
  const { accessToken } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  return (
    <S.Navigation>
      <S.Main>
        <S.Logo>
          <Link to={ROUTE.HOME}>RUNNINGMAP</Link>
        </S.Logo>
        <S.Menu>
          <S.MenuItem>
            <Link to={ROUTE.STATION}>역 관리</Link>
          </S.MenuItem>
          <S.MenuItem>
            <Link to={ROUTE.LINE}>노선 관리</Link>
          </S.MenuItem>
          <S.MenuItem>
            <Link to={ROUTE.SECTION}>구간 관리</Link>
          </S.MenuItem>
          <S.MenuItem>
            <Link to={ROUTE.MAP}>전체 보기</Link>
          </S.MenuItem>
          <S.MenuItem>
            {accessToken ? (
              <Link to={ROUTE.SIGN_IN} onClick={() => dispatch({ type: 'LOG_OUT' })}>
                로그아웃
              </Link>
            ) : (
              <Link to={ROUTE.SIGN_IN}>로그인</Link>
            )}
          </S.MenuItem>
        </S.Menu>
      </S.Main>
    </S.Navigation>
  );
};

export default Navigation;
