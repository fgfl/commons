import React from 'react';

import { storiesOf } from '@storybook/react';

import ProfileText from '../views/ProfilePage/ProfileText';

const user = {
  name: 'Fred',
  username: 'Ffff',
  email: 'fff@fff.com',
  password_digest: 'hello',
  phone_number: '123-456-7890',
  postal_code: 'A1B 2C3',
  email_notification: true,
  sms_notification: true
};
storiesOf('ProfileText', module).add('Default', () => (
  <ProfileText user={user}></ProfileText>
));
