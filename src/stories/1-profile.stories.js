import React, { Fragment } from 'react';

import { storiesOf } from '@storybook/react';

import Profile from '../views/ProfilePage/Profile';

const user = {
  name: 'Fred',
  username: 'Ffff',
  email: 'fff@fff.com',
  password_digest: 'hello',
  phone_number: '123-456-7890',
  postal_code: 'A1B2C3',
  email_notification: true,
  sms_notification: true,
  user_categories: [1, 3, 5, 9],
  user_bills: [3, 5, 6],
};

const categories = [
  'oen',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eigth',
  'nine',
  'ten',
];

const handleProfileUpdate = () => {};

storiesOf('Profile', module)
  .add('Default', () => {
    return (
      <Fragment>
        <Profile
          user={user}
          handleProfileUpdate={handleProfileUpdate}
          categories={categories}
        ></Profile>
      </Fragment>
    );
  })
  .add('No postal code saved', () => {
    const user = {
      name: 'Fred',
      username: 'Ffff',
      email: 'fff@fff.com',
      password_digest: 'hello',
      phone_number: '123-456-7890',
      postal_code: '',
      email_notification: true,
      sms_notification: true,
      user_categories: [1, 3, 5, 9],
      user_bills: [3, 5, 6],
    };

    return (
      <Fragment>
        <Profile
          user={user}
          handleProfileUpdate={handleProfileUpdate}
          categories={categories}
        ></Profile>
      </Fragment>
    );
  });
