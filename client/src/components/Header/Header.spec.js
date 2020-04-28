import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Header', () => {
  describe('Header initial', () => {
    const props = {
      Users: {
        loading: true,
        openWindowLogIn: false,
        isAuthorization: false,
        jwt: '',
        error: '',
        personalInfo: {
          _id: '',
          isAdmin: false,
          login: '',
          firstName: '',
          lastName: '',
          middleName: ''
        }
      },
      openWindowAuth: () => {},
      signOut: () => {}
    };

    let store = mockStore(props);

    const accessDenied = shallow(<Header store={store} />);
    it('renders properly', () => {
      expect(accessDenied).toMatchSnapshot();
    });
  });
});
