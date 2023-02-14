import React from 'react';
import { render } from '@testing-library/react';
import MainButton from '../MainButton';

describe('MainButton', () => {
  it('should create MainButton', () => {
    const component = render(<MainButton title="Title" />);

    expect(component).toMatchSnapshot();
  });
});
