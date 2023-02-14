import React from 'react';
import { render } from '@testing-library/react';
import Header from '../Header';

describe('header', () => {
  it('should create header component', () => {
    const component = render(<Header />);

    expect(component).toMatchSnapshot();
  });
});
