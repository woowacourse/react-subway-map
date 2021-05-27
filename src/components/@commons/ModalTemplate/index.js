import PropTypes from 'prop-types';
import Portal from '../Portal';
import { Dimmer, Container, Title, Content } from './style';

const ModalTemplate = ({ title, children, onClickToClose }) => (
  <Portal>
    <Dimmer onClick={(event) => onClickToClose(event)}>
      <Container>
        <button type="button" onClick={(event) => onClickToClose(event)}>
          ✖️
        </button>
        <Title>{title}</Title>
        <Content>{children}</Content>
      </Container>
    </Dimmer>
  </Portal>
);

ModalTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onClickToClose: PropTypes.func.isRequired,
};

export default ModalTemplate;
