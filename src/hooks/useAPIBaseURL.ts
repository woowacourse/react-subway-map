import axios from 'axios';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { API_INFO } from '../constants/api';
import { RootState } from '../redux/store';
import { getApiOwner } from '../storage/service';

const useAPIBaseURL = (): void => {
  const apiOwner = useSelector((state: RootState) => state.api.owner);

  axios.defaults.baseURL = API_INFO[getApiOwner()].endPoint;

  useEffect(() => {
    axios.defaults.baseURL = API_INFO[apiOwner].endPoint;
  }, [apiOwner]);
};

export default useAPIBaseURL;
