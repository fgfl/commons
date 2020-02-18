import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import LoginForm from '../components/LoginForm';

storiesOf('LoginForm', module)
  .addParameters({
    backgrounds: [{ name: 'dark', value: '#f2ff3e', default: true }],
  })
  .add('Empty', () => <LoginForm />)
  .add('Filled in', () => <LoginForm email="test@test.com" />);
