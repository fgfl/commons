import React from 'react';

import { storiesOf } from '@storybook/react';

import LoadingSpinner from '../views/LoadingSpinner/LoadingSpinner';

storiesOf('LoadingSpinner', module)
  .add('Default', () => <LoadingSpinner></LoadingSpinner>)
  .add('Centered within element', () => (
    <div
      style="width: 200px;
	height: 200px;
	background-color: red;"
    >
      <LoadingSpinner></LoadingSpinner>
    </div>
  ));
