import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import { Analysis } from './Analysis';

describe('<Analysis />', () => {
  let shallow;
  beforeAll(() => {
    shallow = createShallow();
  });

  it('should work', () => {
    const wrapper = shallow(<Analysis />);
    expect(wrapper).toMatchSnapshot();
  });
});
