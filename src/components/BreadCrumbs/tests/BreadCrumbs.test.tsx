import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BreadCrumbs from '../BreadCrumbs';

describe('BreadCrumbs', () => {
  it('should create BreadCrumbs', () => {
    const component = render(
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<BreadCrumbs title="Test" link="candidates" />} />
        </Routes>
      </BrowserRouter>,
    );

    expect(component).toMatchSnapshot();
  });
});
