import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { ROUTE } from '../../../constants/constant';
import useUser from '../../../hook/useUser';
import * as S from './Navigation.styles';

const Navigation = () => {
  const { accessToken } = useUser();
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
          {/* TODO: 2단계 요구사항 */}
          {/* <S.MenuItem>
            <Link to={ROUTE.HOME}>경로 검색</Link>
          </S.MenuItem> */}
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
