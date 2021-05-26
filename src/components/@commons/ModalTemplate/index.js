import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Dimmer, Container, Title, Content } from './style';

const ModalPortal = ({ children }) => {
  let $modal = document.querySelector('#modal');

  if (!$modal) {
    $modal = document.createElement('div');
    $modal.id = 'modal';
    document.body.append($modal);
  }

  return createPortal(children, $modal);
};

const ModalTemplate = ({ title, children, onClickToClose }) => (
  <ModalPortal>
    <Dimmer onClick={(event) => onClickToClose(event)}>
      <Container>
        <button type="button" onClick={(event) => onClickToClose(event)}>
          ✖️
        </button>
        <Title>{title}</Title>
        <Content>{children}</Content>
      </Container>
    </Dimmer>
  </ModalPortal>
);

ModalTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onClickToClose: PropTypes.func.isRequired,
};

export default ModalTemplate;
