import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';

import idToCategoryName from './helpers/idToCategoryName';

const Confirmation = (props) => {
  const back = (e) => {
    e.preventDefault();
    props.prevStep();
  };

  const proceed = (event) => {
    event.preventDefault();
    props.nextStep(4);
  };

  const categories = props.details.categories.map((categoryId) => {
    return (
      <Typography key={categoryId}>{idToCategoryName(categoryId)}</Typography>
    );
  });

  const useStyles = makeStyles((theme) => ({
    paper: {
      zIndex: 1000,
      marginTop: theme.spacing(4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      border: 5,
      padding: theme.spacing(2),
      textAlign: 'center'
    },
    avatar: {
      zIndex: 1000,
      marginBottom: theme.spacing(2),
      width: '120px',
      height: '120px',
      backgroundColor: '#29c0a8'
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      backgroundColor: '#29c0a8'
    },
    accountCircle: {
      width: '100px',
      height: '100px',
      color: 'white'
    },
    backDrop: {
      position: 'absolute',
      height: '75%',
      width: '100%',
      bottom: 0,
      left: 0,
      zIndex: 0
    }
  }));
  const classes = useStyles();

  return (
    <div>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PersonIcon className={classes.accountCircle} />
        </Avatar>
        <Typography variant="h4">Confirm your details</Typography>
      </div>
      <Typography>Name: {props.details.name}</Typography>
      <Typography>Username: {props.details.username}</Typography>
      <Typography>Email: {props.details.email}</Typography>
      <Typography>Selected Categories:</Typography>
      {categories}

      <Button color="secondary" variant="contained" onClick={back}>
        Back
      </Button>

      <Button color="primary" variant="contained" onClick={proceed}>
        Submit
      </Button>
      <div>{props.errors ? props.handleErrors() : null}</div>
    </div>
  );
};

export default Confirmation;
