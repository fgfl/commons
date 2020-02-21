import React, { useState, useEffect, Fragment } from 'react';

import Grid from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import mapUserFieldToLabel from '../../helpers/mapUserFieldToLabel';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles((theme) => ({
  profileTable: {
    display: 'flex',
    flexDirection: 'row',
  },
}));

const ProfileText = ({ user, handleProfileUpdate }) => {
  const [editStatus, setEditStatus] = useState(false);
  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(user.phone_number);
  const [postalCode, setPostalCode] = useState(user.postal_code);
  const [emailNotification, setEmailNotification] = useState(
    user.email_notification
  );
  const [smsNotification, setSmsNotification] = useState(user.sms_notification);

  const parseForm = () => {
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
      sms_notification: smsNotification,
    };

    handleProfileUpdate(formValues);
  };

  const handleCheckChange = (event, setFunction) => {
    setFunction(event.target.checked);
  };

  const classes = useStyles();

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        id="name"
        label={mapUserFieldToLabel('name')}
        name={mapUserFieldToLabel('name')}
        InputProps={{
          readOnly: !editStatus,
        }}
        defaultValue={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        id="username"
        label={mapUserFieldToLabel('username')}
        name={mapUserFieldToLabel('username')}
        InputProps={{
          readOnly: !editStatus,
        }}
        defaultValue={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        id="email"
        label={mapUserFieldToLabel('email')}
        name={mapUserFieldToLabel('email')}
        InputProps={{
          readOnly: !editStatus,
        }}
        defaultValue={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        variant="outlined"
        type="password"
        margin="normal"
        fullWidth
        id="password"
        label={mapUserFieldToLabel('password_digest')}
        name={mapUserFieldToLabel('password_digest')}
        InputProps={{
          readOnly: !editStatus,
        }}
        defaultValue=""
        onChange={(e) => setPassword(e.target.value)}
      />
      {editStatus && (
        <TextField
          variant="outlined"
          type="password"
          margin="normal"
          fullWidth
          id="password_confirmation"
          label="Confirm password"
          name="Confirm password"
          InputProps={{
            readOnly: !editStatus,
          }}
          defaultValue=""
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
      )}
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        id="phone_number"
        label={mapUserFieldToLabel('phone_number')}
        name={mapUserFieldToLabel('phone_number')}
        InputProps={{
          readOnly: !editStatus,
        }}
        defaultValue={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        id="postal_code"
        label={mapUserFieldToLabel('postal_code')}
        name={mapUserFieldToLabel('postal_code')}
        InputProps={{
          readOnly: !editStatus,
        }}
        defaultValue={postalCode}
        onChange={(e) => setPostalCode(e.target.value)}
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={emailNotification}
            onChange={(e) => handleCheckChange(e, setEmailNotification)}
            inputProps={{ 'aria-label': 'email notification checkbox' }}
          />
        }
        label={mapUserFieldToLabel('email_notification')}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={smsNotification}
            onChange={(e) => handleCheckChange(e, setSmsNotification)}
            inputProps={{ 'aria-label': 'sms notification checkbox' }}
          />
        }
        label={mapUserFieldToLabel('sms_notification')}
      />

      <div>
        <Grid container direction="row" justify="flex-end" alignItems="center">
          {editStatus ? (
            <Fragment>
              <Grid item="true">
                <Button
                  type="submit"
                  variant="contained"
                  onClick={(e) => parseForm()}
                >
                  Save
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  onClick={(e) => setEditStatus(false)}
                >
                  Cancel
                </Button>
              </Grid>
            </Fragment>
          ) : (
            <Grid item>
              <Button variant="contained" onClick={(e) => setEditStatus(true)}>
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
