import React, { Fragment } from 'react';

import { storiesOf } from '@storybook/react';

import Profile from '../views/ProfilePage/Profile';

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

storiesOf('Profile', module)
  .add('Default', () => {
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
    return (
      <Fragment>
        <Profile user={user}></Profile>
      </Fragment>
    );
  })
  .add('No postal code saved', () => {
    user.postal_code = '';

    return (
      <Fragment>
        <Profile user={user}></Profile>
      </Fragment>
    );
  });
