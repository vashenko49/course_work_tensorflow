import React from 'react';
import { shallow } from 'enzyme';
import AccessDenied from './AccessDenied';

describe('AccessDenied', () => {
  describe('AccessDenied initial', () => {
    const accessDenied = shallow(<AccessDenied {...{}} />);
    it('renders properly', () => {
      expect(accessDenied).toMatchSnapshot();
    });
  });
});
