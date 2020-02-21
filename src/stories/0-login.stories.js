import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import LoginForm from '../components/registrations/Login';

storiesOf('LoginForm', module)
  .addParameters({
    backgrounds: [{ name: 'dark', value: '#f2ff3e', default: true }],
  })
  .add('Empty', () => <LoginForm />)
  .add('Error', () => <LoginForm error="invalid" />)
  .add('Login clickable', () => (
    <LoginForm onClick={action('clicked login')} />
  ));
