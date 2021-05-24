import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import SubwayImage from '../../../assets/img/subway.png';
import { GUIDE_MESSAGE } from '../../../constants';
import { useDispatch, useSelector } from 'react-redux';
import Home from './Home';
import { ISignedUser } from '../../../features/signedUserSlice';

jest.mock('react-redux');

describe('Home', () => {
  it('render image', () => {
    (useSelector as jest.Mock).mockImplementation(state => {
      return { accessToken: state.accessTokenToken, email: state.email };
    });
    (useDispatch as jest.Mock).mockImplementation(() => jest.fn());

    const home = render(<Home />);
    const image = home.getByRole('img');

    expect(image).toHaveAttribute('src', SubwayImage);
  });

  it('render before-login guide message', () => {
    (useSelector as jest.Mock).mockImplementation(() => {
      return { id: null, email: null, age: null, accessToken: null };
    });
    (useDispatch as jest.Mock).mockImplementation(() => jest.fn());
    const { container } = render(<Home />);
    expect(container).toHaveTextContent(GUIDE_MESSAGE.BEFORE_LOGIN);
  });

  it('render before-login guide message', () => {
    const signedUser: ISignedUser = {
      id: 909090,
      email: 'test@test.com',
      age: 12,
      accessToken: '123213213',
    };

    (useSelector as jest.Mock).mockImplementation(() => {
      return signedUser;
    });
    (useDispatch as jest.Mock).mockImplementation(() => jest.fn());

    const { container } = render(<Home />);
    expect(container).toHaveTextContent(GUIDE_MESSAGE.AFTER_LOGIN);
  });
});
