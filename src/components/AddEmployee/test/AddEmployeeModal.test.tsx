import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddEmployeeModal from '../AddEmployeeModal';
import store from '../../../store';

describe('AddEmployeeModal', () => {
  it('should create AddEmployeeModal', () => {
    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route
              path="*"
              element={<AddEmployeeModal setIsOpen={() => true} isOpen />}
            />
          </Routes>
        </BrowserRouter>
      </Provider>,
    );

    expect(component).toMatchSnapshot();
  });
});
