import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Typography, TextField, Button, Avatar } from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

import axios from 'axios';

const Signup = (props) => {
  const [state, setState] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    postalCode: '',
    errors: {
      name:
        'Name must be 4 characters long and only contain letters and spaces.',
      username:
        'Username must be 4 characters long and only contain alphanumeric characters and underscores.',
      email: 'Email is not valid.',
      password: 'Password must be 5 characters long!',
      passwordConfirmation: 'Password and password confirmation must match!',
      postalCode: 'Postal code must look like A1A1A1 or A1A 1A1',
    },
    available: {
      usernameTaken: '',
      emailTaken: '',
    },
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event;
    let errors = state.errors;

    switch (name) {
      case 'name':
        errors.name =
          value.length < 4 || !validNameRegex.test(value)
            ? 'Name must be 4 characters long and only contain letters and spaces.'
            : '';
        break;
      case 'username':
        errors.username =
          value.length === 0 ||
          value.length < 4 ||
          !validUsernameRegex.test(value)
            ? 'Username must be 4 characters long and only contain alphanumeric characters and underscores.'
            : '';
        break;
      case 'email':
        errors.email =
          value.length === 0 || !validEmailRegex.test(value)
            ? 'Email is not valid.'
            : '';
        break;
      case 'password':
        errors.password =
          value.length === 0 || value.length < 5
            ? 'Password must be 5 characters long!'
            : '';
        break;
      case 'passwordConfirmation':
        errors.passwordConfirmation =
          value !== state.password
            ? 'Password and password confirmation must match!'
            : '';
        break;
      case 'postalCode':
        errors.postalCode =
          value.length === 0 || postalCodeRegex.test(value)
            ? ''
            : 'Postal code must look like: A1A1A1 or A1A 1A1.';
        break;
      default:
        break;
    }
    setState((prevState) => ({
      ...prevState,
      [name]: value,
      errors,
      available: {
        usernameTaken: '',
        emailTaken: '',
      },
    }));
  };

  const validNameRegex = RegExp(/^([a-zA-Z -]+)$/);

  const validUsernameRegex = RegExp(/^([a-zA-Z0-9_-]+)$/);

  const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );

  const postalCodeRegex = /^(?!.*[DFIOQU])[A-VXY][0-9][A-Z] ?[0-9][A-Z][0-9]$/;

  const checkAvailability = async (param, field) => {
    const user = { [field]: param };

    try {
      const checkParam = await axios.post(
        `${process.env.REACT_APP_COMMONS_API}/${field}_exists`,
        { user }
      );
      return checkParam.status === 200 && true;
    } catch (error) {
      const fieldUp = field.charAt(0).toUpperCase() + field.slice(1);
      setState((prevState) => ({
        ...prevState,
        available: {
          ...prevState.available,
          [`${field}Taken`]: `${fieldUp} ${param} is already associated with a user account.`,
        },
      }));
      console.error(`Error occurred on checkAvailability: ${error}`);
      return false;
    }
  };

  const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
  };

  const checkValidations = async () => {
    let usernameAvailable = await checkAvailability(state.username, 'username');
    let emailAvailable = await checkAvailability(state.email, 'email');
    const formValidated = validateForm(state.errors);
    return usernameAvailable && emailAvailable && formValidated && true;
  };

  const proceed = async (event) => {
    event.preventDefault();
    setSubmitted(true);
    const validated = await checkValidations();
    setState((prev) => ({
      ...prev,
      postalCode: prev.postalCode.replace(/ /g, ''),
      errors: {
        ...prev.errors,
      },
      available: {
        ...prev.available,
      },
    }));
    console.log(state);
    validated ? props.nextStep(1, state) : console.error('Invalid Form');
  };

  const useStyles = makeStyles((theme) => ({
    paper: {
      zIndex: 1000,
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4),
      alignItems: 'center',
      border: 5,
      padding: theme.spacing(2),
      textAlign: 'center',
    },
    avatar: {
      zIndex: 1000,
      margin: '0 auto',
      marginBottom: theme.spacing(2),
      width: '120px',
      height: '120px',
      backgroundColor: '#29c0a8',
    },
    form: {
      zIndex: 1000,
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      textAlign: 'center',
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      backgroundColor: '#29c0a8',
    },
    accountCircle: {
      width: '90px',
      height: '90px',
      color: 'white',
    },
    button: {
      margin: '1em',
    },
    error: {
      color: 'red',
    },
  }));
  const classes = useStyles();

  const generateUsernameErrorString = () => {
    let errorString = '';
    if (state.errors.username.length > 0) {
      errorString += `${state.errors.username}\n`;
    }
    if (state.available.usernameTaken.length > 0) {
      errorString += `${state.available.usernameTaken}`;
    }
    return errorString;
  };

  const generateEmailErrorString = () => {
    let errorString = '';
    if (state.errors.email.length > 0) {
      errorString += `${state.errors.email}\n`;
    }
    if (state.available.emailTaken.length > 0) {
      errorString += `${state.available.emailTaken}`;
    }
    return errorString;
  };

  return (
    <Container maxWidth="xs" className={classes.paper}>
      <Avatar className={classes.avatar}>
        <PersonAddIcon className={classes.accountCircle} />
      </Avatar>
      <Typography variant="h4">
        Not a Member Yet?
        <br /> Sign Up!
      </Typography>
      <form className={classes.form} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          error={submitted && state.errors.name.length > 0}
          helperText={submitted ? state.errors.name : ''}
          id="name"
          label="Name"
          name="name"
          autoComplete="name"
          autoFocus
          defaultValue={state.name}
          value={state.name}
          onChange={(e) => handleChange(e.target)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          error={
            (submitted && state.errors.username.length > 0) ||
            state.available.usernameTaken.length > 0
          }
          helperText={submitted && generateUsernameErrorString()}
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          autoFocus
          defaultValue={state.username}
          value={state.username}
          onChange={(e) => handleChange(e.target)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          error={
            (submitted && state.errors.email.length > 0) ||
            state.available.emailTaken.length > 0
          }
          helperText={submitted && generateEmailErrorString()}
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          defaultValue={state.email}
          value={state.email}
          onChange={(e) => handleChange(e.target)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          error={submitted && state.errors.password.length > 0}
          helperText={submitted ? state.errors.password : ''}
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={(e) => handleChange(e.target)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          error={
            submitted &&
            state.errors.passwordConfirmation &&
            state.errors.passwordConfirmation.length > 0
          }
          helperText={submitted ? state.errors.passwordConfirmation : ''}
          name="passwordConfirmation"
          label="Confirm Password"
          type="password"
          id="password-confirmation"
          autoComplete="current-password"
          onChange={(e) => handleChange(e.target)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          error={submitted && state.errors.postalCode.length > 0}
          helperText={submitted ? state.errors.postalCode : ''}
          name="postalCode"
          label="Postal Code"
          type="postal"
          id="postal-code"
          defaultValue={state.postalCode}
          value={state.postalCode}
          autoComplete="postal-code"
          onChange={(e) => handleChange(e.target)}
        />
      </form>
      <Button
        classNames={classes.button}
        color="primary"
        variant="contained"
        onClick={proceed}
      >
        Continue
      </Button>
    </Container>
  );
};
export default Signup;
