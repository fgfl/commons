import React, { useState, useEffect, Fragment as Grid } from 'react';

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
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
    },
  },
  avatar: {},
  buttons: {},
}));

const Profile = ({ user, handleProfileUpdate }) => {
  const [editStatus, setEditStatus] = useState(false);

  useEffect(() => {}, []);

  const classes = useStyles();

  return (
    <Container maxWidth="sm" className={classes.container}>
      <Avatar className={classes.avatar}>
        <PersonIcon className={classes.accountCirle} />
      </Avatar>
      <ProfileText user={user} onChange></ProfileText>
      {editStatus ? (
        <Button variant="contained">Edit</Button>
      ) : (
        <Grid container>
          <Button variant="contained">Save</Button>
          <Button variant="contained">Cancel</Button>
        </Grid>
      )}
    </Container>
  );
};

export default Profile;
