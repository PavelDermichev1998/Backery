import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ErrorPage from '../ErrorPage';

describe('ErrorPage', () => {
  it('should create ErrorPage', () => {
    const component = render(
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>,
    );

    expect(component).toMatchSnapshot();
  });
});
