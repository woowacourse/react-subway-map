import { useContext } from 'react';
import { ThemeContext } from '../../../contexts/ThemeContextProvider';
import { Container, Loader } from './Spinner.style';

interface SpinnerProps {
  isLoading: boolean;
}

const Spinner = ({ isLoading }: SpinnerProps) => {
  const themeColor = useContext(ThemeContext)?.themeColor;

  return (
    <>
      {isLoading && (
        <Container>
          <Loader borderColor={themeColor ?? 'transparent'} />
        </Container>
      )}
    </>
  );
};

export default Spinner;
