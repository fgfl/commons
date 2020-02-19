import React, { useEffect, Fragment } from 'react';

import Grid from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';

import ProfileField from './ProfileField';
import mapUserFieldToLabel from '../../helpers/mapUserFieldToLabel';
import { Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  profileTable: {
    display: 'flex',
    flexDirection: 'row',
  },
}));

const ProfileText = ({ user }) => {
  const classes = useStyles();

  const labels = [];
  const values = [];

  Object.entries(user).forEach(([key, val]) => {
    labels.push(<Paper>{mapUserFieldToLabel(key)}</Paper>);
    values.push(<Paper>{val.toString()}</Paper>);
  });

  return (
    <Container>
      <Grid container spacing={1} className={classes.profileTable}>
        <Grid item xs={6}>
          {labels}
        </Grid>
        <Grid item xs={6}>
          <FormControl>{values}</FormControl>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfileText;
