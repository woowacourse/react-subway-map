import PropTypes from 'prop-types';
import Portal from '../Portal';
import { Dimmer, Container, Title, Content } from './style';

const ModalTemplate = ({ title, children, closeButton, onClose }) => {
  const handleCloseDimmer = (event) => {
    const target = event.target;
    const currentTarget = event.currentTarget;

    if (target !== currentTarget) return;

    onClose();
  };

  return (
    <Portal>
      <Dimmer onClick={handleCloseDimmer}>
        <Container>
          {closeButton}
          {title && <Title>{title}</Title>}
          <Content>{children}</Content>
        </Container>
      </Dimmer>
    </Portal>
  );
};
//TODO: 다음 프로젝트에서는 Dimmer를 Contents의 sibling node로 두는 게 좋을 것 같다.

ModalTemplate.CloseButton = ({ onClose }) => (
  <button type="button" onClick={onClose}>
    ✖️
  </button>
);

ModalTemplate.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func,
  hasCloseButton: PropTypes.bool,
};

ModalTemplate.defaultProps = {
  onClose: () => {},
};

export default ModalTemplate;
