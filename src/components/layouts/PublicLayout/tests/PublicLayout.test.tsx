import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import PublicLayout from '../PublicLayout';
import store from '../../../../store';

describe('PublicLayout', () => {
  it('should create PublicLayout', () => {
    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={(<PublicLayout loading={false} title="Tests"><div>Test</div></PublicLayout>)}/>
          </Routes>
        </BrowserRouter>
      </Provider>,
    );

    expect(component).toMatchSnapshot();
  });
});
