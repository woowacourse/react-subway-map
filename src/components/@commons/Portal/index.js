import { createPortal } from 'react-dom';

const Portal = ({ children }) => {
  let $portal = document.querySelector('#portal');

  if (!$portal) {
    $portal = document.createElement('div');
    $portal.id = 'portal';
    document.body.append($portal);
  }

  return createPortal(children, $portal);
};

export default Portal;
