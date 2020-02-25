import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import ChipsArray from './ChipsArray';

const Categories = (props) => {
  const proceed = (e) => {
    e.preventDefault();
    props.nextStep(3);
  };

  const back = (e) => {
    e.preventDefault();
    props.prevStep();
  };

  const useStyles = makeStyles((theme) => ({
    paper: {
      zIndex: 1000,
      margin: '0 auto',
      marginTop: theme.spacing(4),
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
    accountCirle: {
      width: '100px',
      height: '100px',
      color: 'white'
    },
    buttons: {
      margin: '0 auto'
    }
  }));
  const classes = useStyles();

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <PersonIcon className={classes.accountCirle} />
      </Avatar>
      <Typography variant='h4'>
        Pick the topics you are interested in
      </Typography>
      <ChipsArray
        categories={props.categories}
        clicked={props.clicked}
        setThisOneClicked={props.setThisOneClicked}
      />
      <Container className={classes.buttons}>
        <Button color='secondary' variant='contained' onClick={back}>
          Back
        </Button>

        <Button color='primary' variant='contained' onClick={proceed}>
          Continue
        </Button>
      </Container>
    </div>
  );
};

export default Categories;
