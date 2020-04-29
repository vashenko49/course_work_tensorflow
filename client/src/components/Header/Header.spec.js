import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import { Header } from './Header';

describe('<header />', () => {
  let shallow;
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
  beforeAll(() => {
    shallow = createShallow();
  });

  it('should work', () => {
    const wrapper = shallow(<Header {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
