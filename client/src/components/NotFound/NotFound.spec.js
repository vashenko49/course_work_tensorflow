import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import { NotFound } from './NotFound';

describe('<NotFound />', () => {
  let shallow;
  beforeAll(() => {
    shallow = createShallow();
  });

  it('should work', () => {
    const wrapper = shallow(<NotFound />);
    expect(wrapper).toMatchSnapshot();
  });
});
