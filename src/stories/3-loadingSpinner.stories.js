import React from 'react';

import { storiesOf } from '@storybook/react';

import LoadingSpinner from '../views/LoadingSpinner/LoadingSpinner';

storiesOf('LoadingSpinner', module).add('Default', () => (
  <LoadingSpinner></LoadingSpinner>
));
