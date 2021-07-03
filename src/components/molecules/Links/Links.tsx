import { useHistory } from 'react-router-dom';
import { ROUTE } from '../../../constants';
import { Button } from '../../atoms';

const loginedMenu = [
  {
    path: ROUTE.STATION,
    title: '🚇 역 관리',
  },
  {
    path: ROUTE.LINE,
    title: '🚇 노선 관리',
  },
  {
    path: ROUTE.SECTION,
    title: '🚇 구간 관리',
  },
  {
    path: ROUTE.MAP,
    title: '🚇 전체 보기',
  },
  {
    path: ROUTE.LOGOUT,
    title: '🔒 로그아웃',
  },
];

const unLoginedMenu = [
  {
    path: ROUTE.LOGIN,
    title: '🔑 로그인',
  },
];

interface LinksProps {
  isAuthed: boolean;
}

const Links = ({ isAuthed }: LinksProps) => {
  const history = useHistory();

  const goPage = (path: string) => {
    history.push({ pathname: path });
  };

  return (
    <>
      {isAuthed
        ? loginedMenu.map(({ path, title }) => {
            return (
              <Button key={path} type="button" buttonTheme="menu" onClick={() => goPage(path)}>
                {title}
              </Button>
            );
          })
        : unLoginedMenu.map(({ path, title }) => {
            return (
              <Button key={path} type="button" buttonTheme="menu" onClick={() => goPage(path)}>
                {title}
              </Button>
            );
          })}
    </>
  );
};

export default Links;
