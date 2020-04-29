import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import { HomePage } from './HomePage';

describe('<HomePage />', () => {
  let shallow;
  beforeAll(() => {
    shallow = createShallow();
  });

  it('should work', () => {
    const wrapper = shallow(<HomePage />);
    expect(wrapper).toMatchSnapshot();
  });
});
