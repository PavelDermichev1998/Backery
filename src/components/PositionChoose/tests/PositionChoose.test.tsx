import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import PositionChoose from '../PositionChoose';
import store from '../../../store';

describe('PositionChoose', () => {
  it('should create PositionChoose', () => {
    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<PositionChoose positionName="Test" />} />
          </Routes>
        </BrowserRouter>
      </Provider>,
    );

    expect(component).toMatchSnapshot();
  });
});
