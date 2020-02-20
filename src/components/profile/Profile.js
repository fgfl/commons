import React, { useState, useEffect, Fragment as Grid, Fragment } from 'react';

import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import Button from '@material-ui/core/Button';

import ProfileText from './ProfileText';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    padding: '0.5em',

    border: '5px',
    backgroundColor: 'aquamarine',
    // [theme.breakpoints.up('md')]: {
    //   flexDirection: 'row',
    // },
  },
  avatar: {},
  buttons: {},
}));

const Profile = ({ user, handleProfileUpdate }) => {
  useEffect(() => {}, []);

  const classes = useStyles();

  return (
    <Container maxWidth="sm" className={classes.container}>
      <div>
        <Grid container direction="row" alignItems="center" wrap="wrap">
          <Grid item direction="column">
            <Avatar className={classes.avatar}>
              <PersonIcon className={classes.accountCirle} />
            </Avatar>
          </Grid>
          <Grid item>
            <ProfileText
              user={user}
              handleProfileUpdate={handleProfileUpdate}
            ></ProfileText>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default Profile;
