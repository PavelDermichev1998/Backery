import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../../store';
import RegisterPage from '../RegisterPage';

describe('LoginPage', () => {
  it('should create LoginPage', () => {
    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<RegisterPage />} />
          </Routes>
        </BrowserRouter>
      </Provider>,
    );

    expect(component).toMatchSnapshot();
  });
});
