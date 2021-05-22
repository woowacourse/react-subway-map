import * as S from './Navigation.styles';

const Navigation = () => {
  return (
    <S.Navigation>
      <S.Main>
        <S.Logo>
          <a>RUNNINGMAP</a>
        </S.Logo>
        <S.Menu>
          <S.MenuItem>
            <a>역 관리</a>
          </S.MenuItem>
          <S.MenuItem>
            <a>노선 관리</a>
          </S.MenuItem>
          <S.MenuItem>
            <a>구간 관리</a>
          </S.MenuItem>
          <S.MenuItem>
            <a>경로 검색</a>
          </S.MenuItem>
          <S.MenuItem>
            <a>로그인</a>
          </S.MenuItem>
        </S.Menu>
      </S.Main>
    </S.Navigation>
  );
};

export default Navigation;
