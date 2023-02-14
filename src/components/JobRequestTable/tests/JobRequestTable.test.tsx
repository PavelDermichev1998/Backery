import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import JobRequestTable from '../JobRequestTable';
import store from '../../../store';

describe('JobRequestTable', () => {
  it('should create JobRequestTable', () => {
    const users = [
      {
        id: '1',
        user: {
          id: '1',
          name: '1',
          secondName: '1',
          email: '1',
          phone: '1',
          createdAt: '1',
          roles: [{ name: '1', id: '' }],
          positions: [{ id: '1', name: '1', description: '1' }],
        },
        position: [{ id: '1', name: '1', description: '1' }],
        approved: false,
      },
    ];

    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route
              path="*"
              element={<JobRequestTable page={1} rowsPerPage={1} users={users} />}
            />
          </Routes>
        </BrowserRouter>
      </Provider>,
    );

    expect(component).toMatchSnapshot();
  });
});
