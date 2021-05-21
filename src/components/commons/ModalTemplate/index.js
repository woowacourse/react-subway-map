import { createPortal } from 'react-dom';
import { Dimmer, Container } from './style';

const ModalPortal = ({ children }) => {
  const $modal = document.querySelector('#modal');
  return $modal ? createPortal(children, $modal) : null;
};

const ModalTemplate = ({ children, onClickToClose }) => (
  <ModalPortal>
    <Dimmer onClick={(event) => onClickToClose(event)}>
      <Container>
        <button onClick={(event) => onClickToClose(event)}>✖️</button>
        {children}
      </Container>
    </Dimmer>
  </ModalPortal>
);

export default ModalTemplate;
