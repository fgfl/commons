import React, { useState } from "react";
import axios from "axios";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import PersonIcon from "@material-ui/icons/Person";
import { Typography } from "@material-ui/core";

const Signup = props => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");
  const [errors, setErrors] = useState("");
  const [email_notification, setEmail_notification] = useState(false);
  const [sms_notification, setSms_notification] = useState(false);
  const [phone_number, setPhone_number] = useState("");

  const handleSubmit = event => {
    event.preventDefault();
    let user = {
      name: name,
      username: username,
      email: email,
      password: password,
      password_confirmation: password_confirmation,
      email_notification: email_notification,
      sms_notification: sms_notification,
      phone_number: phone_number
    };

    axios
      .post("http://localhost:3001/users", { user }, { withCredentials: true })
      .then(response => {
        if (response.data.status === "created") {
          props.handleLogin(response.data);
          redirect();
        } else {
          setErrors(response.data.errors);
        }
      })
      .catch(error => console.log("api errors:", error));
  };
  const redirect = () => {
    props.history.push("/");
  };

  const handleErrors = () => {
    return (
      <div>
        <ul>
          {errors.map(error => {
            return (
              <li key={error}>
                <Typography variant="body1">{error}</Typography>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  const handleEmailCheck = () => {
    if (sms_notification === false) {
      setSms_notification(true);
    } else {
      setSms_notification(false);
    }
  };
  const handleSmsCheck = () => {
    if (email_notification === false) {
      setEmail_notification(true);
    } else {
      setEmail_notification(false);
    }
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
      width: "10em",
      height: "10em",
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
      fontSize: "9.5em",
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
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <PersonIcon className={classes.accountCirle} />
          </Avatar>
          <Typography variant="h4">Not a Member Yet? Sign Up!</Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
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
              value={name}
              onChange={e => setName(e.target.value)}
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
              value={username}
              onChange={e => setUsername(e.target.value)}
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
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            {errors ? (
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
                onChange={e => setPassword(e.target.value)}
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
                onChange={e => setPassword(e.target.value)}
              />
            )}
            {errors ? (
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
                onChange={e => setPassword_confirmation(e.target.value)}
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
                onChange={e => setPassword_confirmation(e.target.value)}
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
              onChange={e => setPhone_number(e.target.value)}
            />

            <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend">
                How would you like to receive notifications?
              </FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Receive notifications by email"
                  onChange={handleEmailCheck}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Receive notifications by SMS message"
                  onChange={handleSmsCheck}
                />
              </FormGroup>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={props.onClick}
            >
              SIGNUP
            </Button>
            {errors ? handleErrors() : null}
          </form>
        </div>
        <div className={classes.backDrop}></div>
      </Card>
    </Container>
  );
};
export default Signup;
