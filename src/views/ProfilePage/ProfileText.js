import React, { useState, useEffect, Fragment } from 'react';

import Grid from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import mapUserFieldToLabel from '../../helpers/mapUserFieldToLabel';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const ProfileText = ({ user, handleProfileUpdate }) => {
  const [editStatus, setEditStatus] = useState(false);
  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(user.phone_number || '');
  const [postalCode, setPostalCode] = useState(user.postal_code || '');
  const [emailNotification, setEmailNotification] = useState(
    user.email_notification
  );
  const [smsNotification, setSmsNotification] = useState(user.sms_notification);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    validateForm();
  }, [
    name,
    username,
    email,
    password,
    passwordConfirmation,
    phoneNumber,
    postalCode
  ]);

  const useStyles = makeStyles((theme) => ({
    profileTable: {
      display: 'flex',
      flexDirection: 'row'
    }
  }));
  const classes = useStyles();

  const validationFunctions = {
    id: () => {
      return '';
    },
    name: (value) => {
      const validNameRegex = RegExp(/^([a-zA-Z -]+)$/);
      return value.length < 4 || !validNameRegex.test(value)
        ? 'Name must be 4 characters long and only contain letters and spaces.'
        : '';
    },
    username: (value) => {
      const validUsernameRegex = RegExp(/^([a-zA-Z0-9_-]+)$/);
      return value.length < 4 || !validUsernameRegex.test(value)
        ? 'Username must be 4 characters long and only contain alphanumeric characters and underscores.'
        : '';
    },
    email: (value) => {
      const validEmailRegex = RegExp(
        /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
      );
      return validEmailRegex.test(value) ? '' : 'Email is not valid.';
    },
    password: () => {},
    password_confirmation: (value) => {
      return value === password ? '' : 'Passwords must match.';
    },
    phone_number: (value) => {
      const parsedValue = value.replace(/\D+/g, '');
      return parsedValue.length === 0 || parsedValue.length === 10
        ? ''
        : 'Phone number must be exactly 10 digits long.';
    },
    postal_code: (value) => {
      const postalCodeRegex = /^(?!.*[DFIOQU])[A-VXY][0-9][A-Z]?[0-9][A-Z][0-9]$/;
      return value.length === 0 || postalCodeRegex.test(value)
        ? ''
        : 'Postal code must look like: A1A1A1.';
    },
    email_notification: () => {
      return '';
    },
    sms_notification: () => {
      return '';
    }
  };

  const validateForm = () => {
    const formValues = {
      id: user.id,
      name: name,
      username: username,
      email: email,
      password: password,
      password_confirmation: passwordConfirmation,
      phone_number: phoneNumber,
      postal_code: postalCode,
      email_notification: emailNotification,
      sms_notification: smsNotification
    };
    const newValidity = {};
    let isValid = true;

    for (const key in formValues) {
      const problem = validationFunctions[key](formValues[key]);
      newValidity[key] = problem;
      if (problem && problem.length) {
        isValid = false;
      }
    }

    setFormErrors(newValidity);
    return isValid;
  };

  const saveForm = () => {
    const formValues = {
      id: user.id,
      name: name,
      username: username,
      email: email,
      password: password,
      password_confirmation: passwordConfirmation,
      phone_number: phoneNumber,
      postal_code: postalCode,
      email_notification: emailNotification,
      sms_notification: smsNotification
    };

    if (validateForm()) {
      setEditStatus(false);
      handleProfileUpdate(formValues);
    }
  };

  const handleCheckBoxChange = (event, setFunction) => {
    setFunction(event.target.checked);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <TextField
        variant='outlined'
        margin='normal'
        error={formErrors.name && formErrors.name.length > 0}
        helperText={formErrors.name}
        required
        fullWidth
        id='name'
        label={mapUserFieldToLabel('name')}
        name={mapUserFieldToLabel('name')}
        InputProps={{
          readOnly: !editStatus
        }}
        defaultValue={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <TextField
        variant='outlined'
        margin='normal'
        error={formErrors.username && formErrors.username.length > 0}
        helperText={formErrors.username}
        required
        fullWidth
        id='username'
        label={mapUserFieldToLabel('username')}
        name={mapUserFieldToLabel('username')}
        InputProps={{
          readOnly: !editStatus
        }}
        defaultValue={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        variant='outlined'
        margin='normal'
        error={formErrors.email && formErrors.email.length > 0}
        helperText={formErrors.email}
        required
        fullWidth
        id='email'
        label={mapUserFieldToLabel('email')}
        name={mapUserFieldToLabel('email')}
        InputProps={{
          readOnly: !editStatus
        }}
        defaultValue={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {editStatus && (
        <Fragment>
          <TextField
            variant='outlined'
            type='password'
            margin='normal'
            error={formErrors.password && formErrors.password.length > 0}
            helperText={formErrors.password}
            fullWidth
            id='password'
            label={mapUserFieldToLabel('password_digest')}
            name={mapUserFieldToLabel('password_digest')}
            InputProps={{
              readOnly: !editStatus
            }}
            defaultValue=''
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            variant='outlined'
            type='password'
            margin='normal'
            error={
              formErrors.password_confirmation &&
              formErrors.password_confirmation.length > 0
            }
            helperText={formErrors.password_confirmation}
            fullWidth
            id='password_confirmation'
            label='Confirm password'
            name='Confirm password'
            InputProps={{
              readOnly: !editStatus
            }}
            defaultValue=''
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
        </Fragment>
      )}
      <TextField
        variant='outlined'
        margin='normal'
        error={formErrors.phone_number && formErrors.phone_number.length > 0}
        helperText={formErrors.phone_number}
        fullWidth
        id='phone_number'
        label={mapUserFieldToLabel('phone_number')}
        name={mapUserFieldToLabel('phone_number')}
        InputProps={{
          readOnly: !editStatus
        }}
        defaultValue={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <TextField
        variant='outlined'
        margin='normal'
        error={formErrors.postal_code && formErrors.postal_code.length > 0}
        helperText={formErrors.postal_code}
        fullWidth
        id='postal_code'
        label={mapUserFieldToLabel('postal_code')}
        name={mapUserFieldToLabel('postal_code')}
        InputProps={{
          readOnly: !editStatus
        }}
        defaultValue={postalCode}
        onChange={(e) => setPostalCode(e.target.value)}
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={emailNotification}
            onChange={(e) => handleCheckBoxChange(e, setEmailNotification)}
            inputProps={{ 'aria-label': 'email notification checkbox' }}
            disabled={!editStatus}
          />
        }
        label={mapUserFieldToLabel('email_notification')}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={smsNotification}
            onChange={(e) => handleCheckBoxChange(e, setSmsNotification)}
            inputProps={{ 'aria-label': 'sms notification checkbox' }}
            disabled={!editStatus}
          />
        }
        label={mapUserFieldToLabel('sms_notification')}
      />

      <div>
        <Grid container>
          {editStatus ? (
            <Fragment>
              <Grid item='true'>
                <Button
                  type='submit'
                  variant='contained'
                  onClick={(e) => saveForm()}
                >
                  Save
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant='contained'
                  onClick={(e) => setEditStatus(false)}
                >
                  Cancel
                </Button>
              </Grid>
            </Fragment>
          ) : (
            <Grid item>
              <Button variant='contained' onClick={(e) => setEditStatus(true)}>
                Edit
              </Button>
            </Grid>
          )}
        </Grid>
      </div>
    </form>
  );
};

export default ProfileText;
