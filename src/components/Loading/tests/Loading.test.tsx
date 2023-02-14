import React from 'react';
import { render } from '@testing-library/react';
import Loading from '../Loading';

describe('Loading', () => {
  it('should create Loading', () => {
    const component = render(<Loading />);

    expect(component).toMatchSnapshot();
  });
});
