import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import PersonIcon from '@material-ui/icons/Person';
import { Typography, TextField, Button, Avatar } from '@material-ui/core';

const Signup = (props) => {
  const [state, setState] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
    postal_code: '',
    errors: {
      name: '',
      username: '',
      email: '',
      password: '',
      password_confirmation: ''
    }
  });

  const handleChange = (event) => {
    const { name, value } = event;
    let errors = state.errors;

    switch (name) {
      case 'name':
        errors.name = value.length < 1 ? 'Name must be present!' : '';
        break;
      case 'username':
        errors.name =
          value.length < 4 || !validUsernameRegex.test(value)
            ? 'Username must be 4 characters long and only contain valid characters!'
            : '';
        break;
      case 'email':
        errors.email = validEmailRegex.test(value) ? '' : 'Email is not valid!';
        break;
      case 'password':
        errors.password =
          value.length < 8 ? 'Password must be 8 characters long!' : '';
        break;
      case 'password confirmation':
        errors.password =
          value.length !== state.password
            ? 'Password and password confirmation must match!'
            : '';
        break;
      default:
        break;
    }
    setState((prevState) => ({
      ...prevState,
      [name]: value,
      errors
    }));
    console.log(errors);
    console.log('STATE', state.errors);
  };

  const validUsernameRegex = RegExp(/^([a-zA-Z0-9 _-]+)$/);

  const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );

  const proceed = (event) => {
    event.preventDefault();
    props.nextStep(1, state);
  };

  const useStyles = makeStyles((theme) => ({
    paper: {
      zIndex: 1000,
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(8),
      alignItems: 'center',
      border: 5,
      padding: theme.spacing(2),
      textAlign: 'center'
    },
    avatar: {
      zIndex: 1000,
      margin: '0 auto',
      marginBottom: theme.spacing(2),
      width: '120px',
      height: '120px',
      backgroundColor: '#29c0a8'
    },
    form: {
      zIndex: 1000,
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
      textAlign: 'center'
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
    button: {
      margin: '1em'
    }
  }));
  const classes = useStyles();

  return (
    <Container maxWidth="xs" className={classes.paper}>
      <Avatar className={classes.avatar}>
        <PersonIcon className={classes.accountCircle} />
      </Avatar>
      <Typography variant="h4">
        Not a Member Yet?
        <br /> Sign Up!
      </Typography>
      <form className={classes.form} noValidate onSubmit={props.handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="name"
          label="Name"
          name="name"
          autoComplete="name"
          autoFocus
          value={props.name}
          onChange={(e) => handleChange(e.target)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          autoFocus
          value={props.username}
          onChange={(e) => handleChange(e.target)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={props.email}
          onChange={(e) => handleChange(e.target)}
        />
        {props.errors ? (
          <TextField
            error
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => handleChange(e.target)}
          />
        ) : (
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => handleChange(e.target)}
          />
        )}
        {props.errors ? (
          <TextField
            error
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password_confirmation"
            label="Confirm Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => handleChange(e.target)}
          />
        ) : (
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password_confirmation"
            label="Confirm Password"
            type="password"
            id="password-confirmation"
            autoComplete="current-password"
            onChange={(e) => handleChange(e.target)}
          />
        )}

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="postal_code"
          label="Postal Code"
          type="postal"
          id="postal-code"
          autoComplete="postal-code"
          onChange={(e) => handleChange(e.target)}
        />
        <Button
          classNames={classes.button}
          color="primary"
          variant="contained"
          onClick={proceed}
        >
          Continue
        </Button>
        {props.errors ? props.handleErrors() : null}
      </form>
      <div className={classes.backDrop}></div>
    </Container>
  );
};
export default Signup;
