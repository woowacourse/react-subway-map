import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { HOST, ROUTE } from '../../../constants';
import { setHost } from '../../../modules/hostSlice';
import { RootState, useAppDispatch } from '../../../store';
import { Select } from '../../atoms';
import { IOption } from '../../atoms/Select/Select';
import { Container } from './HostSelect.styles';

export const hostOptions: IOption[] = Object.entries(HOST).map(([name, hostUrl]) => ({
  name,
  value: hostUrl,
}));

const HostSelect = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const {
    hostState: { host },
  } = useSelector((state: RootState) => ({ hostState: state.hostReducer }));

  const onChange: React.ChangeEventHandler<HTMLSelectElement> = event => {
    const value = event.target.value;

    dispatch(setHost({ host: value }));

    window.alert('서버가 변경되었습니다.');

    history.push({ pathname: ROUTE.LOGOUT });
  };

  return (
    <Container>
      <span>서버 설정</span>
      <Select options={hostOptions} onChange={onChange} selectValue={host} />
    </Container>
  );
};

export default HostSelect;
