import React from 'react';

import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import ProfileText from './ProfileText';
import FindMyMp from './FindMyMp';
import { Typography } from '@material-ui/core';
import profilePageStyle from 'assets/jss/material-kit-react/views/profilePage';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  avatar: {
    margin: '0 auto',
    width: '100px',
    height: '100px',
    marginBottom: theme.spacing(2)
  },
  personIcon: {
    width: '75px',
    height: '75px'
  },
  profileName: {
    textAlign: 'center'
  },
  form: {
    padding: theme.spacing(2)
  }
}));

const Profile = ({ user, handleProfileUpdate }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container justify='center' alignItems='center'>
        <Grid item xs={12} sm={6}>
          <Avatar className={classes.avatar}>
            <PersonIcon className={classes.personIcon} />
          </Avatar>
          <Typography variant='h5' className={classes.profileName}>
            {user.name}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6}>
          <div className={classes.form}>
            <ProfileText
              user={user}
              handleProfileUpdate={handleProfileUpdate}
            ></ProfileText>
          </div>
        </Grid>
      </Grid>
      <Grid container justify='center'>
        <Grid item xs={12}>
          <FindMyMp user={user} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Profile;
