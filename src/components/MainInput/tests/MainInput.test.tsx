import React from 'react';
import { render } from '@testing-library/react';
import MainInput from '../MainInput';

describe('MainInput', () => {
  it('should create MainInput', () => {
    const changeTestHandler = () => {};
    const component = render(
      <MainInput
        type="text"
        value="test"
        title="Test"
        onChangeProps={changeTestHandler}
      />,
    );

    expect(component).toMatchSnapshot();
  });
});
