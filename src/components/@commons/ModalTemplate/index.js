import PropTypes from 'prop-types';
import Portal from '../Portal';
import { Dimmer, Container, Title, Content } from './style';

const ModalTemplate = ({ title, children, onClickToClose, hasCloseButton }) => (
  <Portal>
    <Dimmer onClick={(event) => onClickToClose(event)}>
      <Container>
        {hasCloseButton && (
          <button type="button" onClick={(event) => onClickToClose(event)}>
            ✖️
          </button>
        )}
        {title && <Title>{title}</Title>}
        <Content>{children}</Content>
      </Container>
    </Dimmer>
  </Portal>
);

ModalTemplate.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClickToClose: PropTypes.func,
  hasCloseButton: PropTypes.bool,
};

ModalTemplate.defaultProps = {
  onClickToClose: () => {},
};

export default ModalTemplate;
