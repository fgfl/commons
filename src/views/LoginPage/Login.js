import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link as RouterLink } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import PersonIcon from "@material-ui/icons/Person";
import { Typography } from "@material-ui/core";

const Login = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");

  // componentWillMount() {
  //   return this.props.loggedInStatus ? this.redirect() : null;
  // }

  useEffect(() => {
    if (props.loggedInStatus) {
      console.log("logged in");
      redirect("/");
    }
  });

  const handleSubmit = event => {
    event.preventDefault();
    let user = {
      email: email,
      password: password
    };

    axios
      .post("http://localhost:3001/login", { user }, { withCredentials: true })
      .then(response => {
        if (response.data.logged_in) {
          props.handleLogin(response.data);
          redirect("/");
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
    console.log(errors);
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
    }
  }));
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PersonIcon className={classes.accountCircle} />
        </Avatar>
        <Typography variant="h4">Login</Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            LOGIN
          </Button>
          <Grid container justify="center">
            <Grid item>
              <Link
                href="#"
                variant="body2"
                component={RouterLink}
                to="/signup-page"
              >
                {"Not a member? Sign up"}
              </Link>
            </Grid>
          </Grid>

          {errors ? handleErrors() : null}
        </form>
      </div>
      <div className={classes.backDrop}></div>
    </Container>
  );
};

export default Login;
