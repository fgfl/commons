import React from 'react';

import { storiesOf } from '@storybook/react';

import LoadingSpinner from '../views/LoadingSpinner/LoadingSpinner';

storiesOf('LoadingSpinner', module)
  .add('Centered within page', () => (
    <div
      style={{
        minHeight: '100vh',
        minWidth: '100vw',
        backgroundColor: 'yellow',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <LoadingSpinner></LoadingSpinner>
    </div>
  ))
  .add('Centered within element', () => (
    <div
      style={{
        position: 'absolute',
        left: '50px',
        width: '200px',
        height: '200px',
        'background-color': 'red',
      }}
    >
      <LoadingSpinner></LoadingSpinner>
    </div>
  ));
