import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ShowPassword from '../ShowPassword';
import store from '../../../store';

describe('ShowPassword', () => {
  it('should create ShowPassword', () => {
    const handler = () => {};
    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={(<ShowPassword isShowPassword link="Register" handleShowPasswordClick={handler}/>)}/>
          </Routes>
        </BrowserRouter>
      </Provider>,
    );

    expect(component).toMatchSnapshot();
  });
});
