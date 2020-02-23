import React, { Fragment } from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Profile from '../views/ProfilePage/Profile';
import FindMyMp from 'components/FindMyMp/FindMyMp';

const user = {
  name: 'Fred',
  username: 'Ffff',
  email: 'fff@fff.com',
  password_digest: 'hello',
  phone_number: '123-456-7890',
  postal_code: 'A1B 2C3',
  email_notification: true,
  sms_notification: true,
};
storiesOf('Profile', module).add('Default', () => (
  <Fragment>
    <Profile user={user}></Profile>
    <FindMyMp></FindMyMp>
  </Fragment>
));
