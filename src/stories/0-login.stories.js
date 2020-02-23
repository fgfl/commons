import React from 'react';
import { MemoryRouter } from 'react-router';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Login from '../components/registrations/Login';

storiesOf('Login', module)
  .addParameters({
    backgrounds: [{ name: 'dark', value: '#f2ff3e', default: true }],
  })
  .add('Empty', () => (
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  ))
  .add('Error', () => (
    <MemoryRouter>
      <Login error="invalid" />
    </MemoryRouter>
  ))
  .add('Login clickable', () => (
    <MemoryRouter>
      <Login onClick={action('clicked login')} />
    </MemoryRouter>
  ));
