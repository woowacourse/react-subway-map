import { Container } from './ApiSwitch.style';
import { API_HOST, ApiHostList } from '../../request';
import { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContextProvider';

const ApiSwitch = () => {
  const themeColor = useContext(ThemeContext)?.themeColor;

  return (
    <Container themeColor={themeColor}>
      <h5>API 서버 변경</h5>
      {ApiHostList?.map((host) => (
        <label key={host}>
          <input
            type="radio"
            name="api-host"
            onChange={() => {
              localStorage.setItem('hostName', host);
              localStorage.setItem('accessToken', '');
              location.reload();
            }}
            value={host}
            checked={API_HOST === host}
          />
          {host}
        </label>
      ))}
    </Container>
  );
};

export default ApiSwitch;
