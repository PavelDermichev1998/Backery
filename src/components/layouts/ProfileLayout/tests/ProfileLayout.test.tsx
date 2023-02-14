import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import ProfileLayout from '../ProfileLayout';
import store from '../../../../store';

describe('ProfileLayout', () => {
  it('should create ProfileLayout', () => {
    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={(<ProfileLayout loading={false}><div>Test</div></ProfileLayout>)} />
          </Routes>
        </BrowserRouter>
      </Provider>,
    );

    expect(component).toMatchSnapshot();
  });
});
