import React, { useState, useEffect, Fragment } from 'react';

import Grid from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import mapUserFieldToLabel from '../../helpers/mapUserFieldToLabel';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
  const [password, setPassword] = useState(user.password_digest);
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(user.phone_number);
  const [postalCode, setPostalCode] = useState(user.postal_code);
  const [emailNotification, setEmailNotification] = useState(
    user.email_notification
  );
  const [smsNotification, setSmsNotification] = useState(user.sms_notification);

  const classes = useStyles();

  const formSetters = {
    name: setName,
    username: setUsername,
    email: setEmail,
    password: setPassword,
    password_confirmation: setPasswordConfirmation,
    phone_number: setPhoneNumber,
    postal_code: setPostalCode,
    email_notification: setEmailNotification,
    sms_notification: setSmsNotification,
  };

  const labels = [];

  Object.entries(user).forEach(([key, val]) => {
    const label = mapUserFieldToLabel(key);
    if (label) {
      labels.push(
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          key={key}
          id={key}
          label={label}
          name={label}
          disabled={!editStatus}
          defaultValue={val}
          onChange={(e) => formSetters[key](e.target.value)}
        />
      );
    }
  });

  const parseForm = () => {
    const formValues = {
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

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      {labels}
      {editStatus && (
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          key="password_confirmation"
          id="passworkd_confirmation"
          label="Confirm password"
          name="Confirm password"
          disabled={!editStatus}
          defaultValue=""
          onChange={(e) => formSetters['password_confirmation'](e.target.value)}
        />
      )}

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
  // <Container>
  //   <Grid container spacing={1} className={classes.profileTable}>
  //     <Grid item xs={6}>
  //       {labels}
  //     </Grid>
  //     <Grid item xs={6}>
  //       <FormControl>{values}</FormControl>
  //     </Grid>
  //   </Grid>
  // </Container>
};

export default ProfileText;
