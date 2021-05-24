import { Container } from './SnackBar.style';

const MAX_STACK_NUM = 3;
const snackBarOrders = Array.from({ length: MAX_STACK_NUM }, (_, index) => index + 1);

type SnackBarOrder = typeof snackBarOrders[number];

const SNACKBAR_HEIGHT_REM = 2.3;
const SNACKBAR_GAP_REM = 0.5;
const getSnackBarBottom = (order: SnackBarOrder) =>
  `${order * (SNACKBAR_HEIGHT_REM + SNACKBAR_GAP_REM) - SNACKBAR_HEIGHT_REM}rem`;

const ANIMATION_DURATION_MS = 1000;

interface SnackBarProps {
  children: string;
  order: SnackBarOrder;
}

const SnackBar = ({ children, order }: SnackBarProps) => {
  return (
    <Container bottom={getSnackBarBottom(order)} animationDuration={`${ANIMATION_DURATION_MS}ms`}>
      {children}
    </Container>
  );
};

export default SnackBar;
export { MAX_STACK_NUM };
export type { SnackBarProps, SnackBarOrder };
