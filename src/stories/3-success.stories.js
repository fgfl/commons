import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { storiesOf } from '@storybook/react';

import Success from '../components/registrations/Signup/Success';

storiesOf('Success', module).add('Show', () => (
  <MemoryRouter>
    <Success></Success>
  </MemoryRouter>
));
