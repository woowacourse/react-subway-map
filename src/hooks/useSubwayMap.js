import { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { ERROR } from '../constants';
import { setMessage } from '../redux';
import { request } from '../utils';

const useSubwayMap = () => {
  const [subwayMap, setSubwayMap] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const response = await request.get('/map');

        setSubwayMap(response.data);
      } catch (error) {
        console.error(error);
        dispatch(setMessage({ message: ERROR.UNKNOWN }));
      }
    })();
  }, [setSubwayMap, dispatch]);

  return { subwayMap };
};

export default useSubwayMap;
