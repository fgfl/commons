import React, { Fragment } from 'react';

import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import ProfileText from './ProfileText';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',

    padding: '0.5em',

    border: '5px',
    backgroundColor: 'aquamarine',

    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
    },
  },
  avatar: {},
  buttons: {},
}));

const Profile = ({ user, handleProfileUpdate }) => {
  const classes = useStyles();
  // direction="row" alignItems="center" wrap="wrap"
  return (
    <Container>
      <Grid container className={classes.container}>
        <Grid item>
          <Avatar className={classes.avatar}>
            <PersonIcon className={classes.accountCirle} />
          </Avatar>
        </Grid>
        <Grid item>
          {user && (
            <ProfileText
              user={user}
              handleProfileUpdate={handleProfileUpdate}
            ></ProfileText>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
