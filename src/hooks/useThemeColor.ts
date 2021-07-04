import { useSelector } from 'react-redux';
import { API_INFO } from '../constants/api';
import { Color } from '../constants/palette';
import { RootState } from '../redux/store';

const useThemeColor = (): Color => {
  const apiOwner = useSelector((state: RootState) => state.api.owner);

  return API_INFO[apiOwner].themeColor;
};

export default useThemeColor;
