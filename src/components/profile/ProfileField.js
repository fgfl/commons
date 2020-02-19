import React, { useEffect } from 'react';

import Grid from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  paper: {
    display: 'flex',
    flexDirection: 'row',
  },
  children: {
    margin: '0.5em',
  },
}));

const ProfileField = ({ fieldName, value }) => {
  const classes = useStyles();
  return (
    <Grid container className={classes.container}>
      <Paper elevation={0} className={classes.paper}>
        <Typography className={classes.children}>{fieldName}:</Typography>
      </Paper>
      <Paper elevation={0} variant="outlined" className={classes.paper}>
        <Typography className={classes.children}>{value}</Typography>
      </Paper>
    </Grid>
  );
};

export default ProfileField;
