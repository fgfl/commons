import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import PersonIcon from "@material-ui/icons/Person";
import { Typography } from "@material-ui/core";

const Signup = props => {
  const proceed = event => {
    event.preventDefault();
    props.nextStep();
  };

  const useStyles = makeStyles(theme => ({
    paper: {
      zIndex: 1000,
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      border: 5,
      padding: theme.spacing(2),
      textAlign: "center"
    },
    avatar: {
      zIndex: 1000,
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
    accountCirle: {
      width: "100px",
      height: "100px",
      color: "white"
    },
    backDrop: {
      position: "absolute",
      height: "75%",
      width: "100%",
      bottom: 0,
      left: 0,
      zIndex: 0
    }
  }));
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <Card className={classes.root} variant="outlined">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <PersonIcon className={classes.accountCirle} />
          </Avatar>
          <Typography variant="h4">Not a Member Yet? Sign Up!</Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={props.handleSubmit}
          >
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
              onChange={e => props.setName(e.target.value)}
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
              onChange={e => props.setUsername(e.target.value)}
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
              onChange={e => props.setEmail(e.target.value)}
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
                onChange={e => props.setPassword(e.target.value)}
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
                onChange={e => props.setPassword(e.target.value)}
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
                onChange={e => props.setPasswordConfirmation(e.target.value)}
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
                onChange={e => props.setPasswordConfirmation(e.target.value)}
              />
            )}
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="telephone"
              label="Phone Number"
              type="telephone"
              id="telephone"
              autoComplete="telephone"
              onChange={e => props.setPhoneNumber(e.target.value)}
            />
            {/* <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={props.onClick}
            >
              SIGNUP
            </Button> */}

            <Button color="primary" variant="contained" onClick={proceed}>
              Continue
            </Button>
            {props.errors ? props.handleErrors() : null}
          </form>
        </div>
        <div className={classes.backDrop}></div>
      </Card>
    </Container>
  );
};
export default Signup;
