import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from './style';

const Snackbar = () => {
  const { snackbar } = useSelector(({ snackbar }) => snackbar);
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!snackbar.message) return;

    setIsVisible(true);

    const fadeOutTimer = setTimeout(() => setIsVisible(false), 2500);

    return () => {
      clearTimeout(fadeOutTimer);
    };
  }, [snackbar, dispatch]);

  return (
    <Container isVisible={isVisible}>
      <span>{snackbar.message}</span>
    </Container>
  );
};

export default Snackbar;
