import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import SubwayImage from '../../../assets/img/subway.png';
import { GUIDE_MESSAGE } from '../../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { unValidSignedUser, validSignedUser } from '../../../fixtures/useSelectorState';
import Home from './Home';

jest.mock('react-redux');

describe('Home', () => {
  beforeAll(() => {
    (useDispatch as jest.Mock).mockImplementation(() => jest.fn());
  });

  it('render image', () => {
    (useSelector as jest.Mock).mockImplementation(() => {
      return validSignedUser;
    });

    const home = render(<Home />);
    const image = home.getByRole('img');

    expect(image).toHaveAttribute('src', SubwayImage);
  });

  it('render before-login guide message', () => {
    (useSelector as jest.Mock).mockImplementation(() => {
      return unValidSignedUser;
    });
    const { container } = render(<Home />);
    expect(container).toHaveTextContent(GUIDE_MESSAGE.BEFORE_LOGIN);
  });

  it('render after-login guide message', () => {
    (useSelector as jest.Mock).mockImplementation(() => {
      return validSignedUser;
    });

    const { container } = render(<Home />);
    expect(container).toHaveTextContent(GUIDE_MESSAGE.AFTER_LOGIN);
  });
});
