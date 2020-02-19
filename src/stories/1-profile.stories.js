import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Profile from '../components/profile/Profile';

const user = {
  name: 'Fred',
  username: 'Ffff',
  email: 'fff@fff.com',
  phone_number: '123-456-7890',
  postal_code: 'A1B 2C3',
  email_notification: true,
  sms_notification: true,
};
storiesOf('Profile', module)
  .add('Default', () => <Profile user={user}></Profile>)
  .add('nothing', () => <Profile></Profile>);
