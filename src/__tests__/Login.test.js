import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';

import Login from '../components/registrations/Login';
import { MemoryRouter, BrowserRouter as Router } from 'react-router';

afterEach(cleanup);

it('renders the login form', () => {
  const { getByText } = render(
    <MemoryRouter>
      <Login></Login>
    </MemoryRouter>
  );
  expect(getByText('LOGIN')).toBeInTheDocument();
  expect(getByText('Not a member? Sign up')).toBeInTheDocument();
});
