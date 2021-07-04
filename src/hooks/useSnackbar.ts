import { useState, useRef, useEffect } from 'react';
import useUpdateEffect from './useUpdateEffect';

const FADEOUT_TIME = 200;

const useSnackbar = (duration: number): [string, (text: string) => void] => {
  const [message, setMessage] = useState({ text: '' });
  const timer = useRef<NodeJS.Timeout | null>(null);

  const setMessageText = (text: string) => {
    setMessage({ text });
  };

  useUpdateEffect(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => {
      setMessageText('');
    }, duration + FADEOUT_TIME);
  }, [message]);

  useEffect(() => {
    return () => {
      clearTimeout(timer.current as NodeJS.Timeout);
      setMessageText('');
    };
  }, []);

  return [message.text, setMessageText];
};

export default useSnackbar;
