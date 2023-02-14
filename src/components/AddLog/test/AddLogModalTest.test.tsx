import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddLogModal from '../AddLogModal';
import store from '../../../store';

describe('AddLogModal', () => {
  it('should create AddLogModal', () => {
    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<AddLogModal setIsOpen={() => true} isOpen />} />
          </Routes>
        </BrowserRouter>
      </Provider>,
    );

    expect(component).toMatchSnapshot();
  });
});
