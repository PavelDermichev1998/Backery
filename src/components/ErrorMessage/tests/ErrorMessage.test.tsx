import React from 'react';
import { render } from '@testing-library/react';
import ErrorMessage from '../ErrorMessage';

describe('ErrorMessage', () => {
  it('should create ErrorMessage', () => {
    const component = render(<ErrorMessage errorText="Test" invalidInput />);

    expect(component).toMatchSnapshot();
  });
});
