import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../../store';
import NavigateItem from '../NavigateItem';
import testImg from '../../../assets/logo.png';

describe('NavigateItem', () => {
  it('should create NavigateItem component', () => {
    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route
              path="*"
              element={<NavigateItem link="/" title="test" image={testImg} />}
            />
          </Routes>
        </BrowserRouter>
      </Provider>,
    );

    expect(component).toMatchSnapshot();
  });
});
