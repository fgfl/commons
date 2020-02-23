import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import PersonIcon from "@material-ui/icons/Person";
import { Typography, TextField, Button, Avatar } from "@material-ui/core";

const Signup = props => {
  let data = {
    name: "",
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
    postal_code: ""
  };

  const proceed = event => {
    event.preventDefault();
    props.nextStep(1, data);
  };

  const useStyles = makeStyles(theme => ({
    paper: {
      zIndex: 1000,
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(8),
      alignItems: "center",
      border: 5,
      padding: theme.spacing(2),
      textAlign: "center"
    },
    avatar: {
      zIndex: 1000,
      margin: "0 auto",
      marginBottom: theme.spacing(2),
      width: "120px",
      height: "120px",
      backgroundColor: "#29c0a8"
    },
    form: {
      zIndex: 1000,
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
      textAlign: "center"
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      backgroundColor: "#29c0a8"
    },
    accountCircle: {
      width: "100px",
      height: "100px",
      color: "white"
    },
    button: {
      margin: "1em"
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
          onChange={e => (data.name = e.target.value)}
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
          onChange={e => (data.username = e.target.value)}
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
          onChange={e => (data.email = e.target.value)}
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
            onChange={e => (data.password = e.target.value)}
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
            onChange={e => (data.password = e.target.value)}
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
            onChange={e => (data.password_confirmation = e.target.value)}
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
            onChange={e => (data.password_confirmation = e.target.value)}
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
          onChange={e => (data.postal_code = e.target.value)}
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
