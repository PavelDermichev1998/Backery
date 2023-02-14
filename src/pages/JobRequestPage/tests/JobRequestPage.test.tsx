import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import JobRequestPage from '../JobRequestPage';
import store from '../../../store';

describe('JobRequestPage', () => {
  it('should create JobRequestPage', () => {
    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<JobRequestPage />} />
          </Routes>
        </BrowserRouter>
      </Provider>,
    );

    expect(component).toMatchSnapshot();
  });
});
