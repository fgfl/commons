import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

const Confirmation = (props) => {
  const useStyles = makeStyles((theme) => ({
    paper: {
      zIndex: 1000,
      marginTop: theme.spacing(4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      border: 5,
      padding: theme.spacing(2),
      textAlign: 'center',
    },
    avatar: {
      zIndex: 1000,
      marginBottom: theme.spacing(2),
      width: '120px',
      height: '120px',
      backgroundColor: '#29c0a8',
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      backgroundColor: '#29c0a8',
    },
    accountCircle: {
      width: '100px',
      height: '100px',
      color: 'white',
    },
    message: {
      padding: theme.spacing(2),
    },
  }));
  const classes = useStyles();

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <ThumbUpIcon className={classes.accountCircle} />
      </Avatar>
      <Grid xs={12} className={classes.message}>
        <Typography variant="h4">Thank you for signing up!</Typography>
      </Grid>

      <Link to="/">
        <Button color="primary" variant="contained">
          Back to Home
        </Button>
      </Link>
      <div>{props.errors ? props.handleErrors() : null}</div>
    </div>
  );
};

export default Confirmation;
