import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import PersonIcon from '@material-ui/icons/Person';

import { BrowserRouter as Router, Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  container: {
    border: 5,
    backgroundColor: 'red',
  },
  paper: {
    zIndex: 1000,
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: 5,
    // backgroundColor: 'white',
    padding: theme.spacing(2),

    // display: 'grid',
    // gridTemplateRows: '1fr 1fr 2fr',
  },
  avatar: {
    zIndex: 1000,
    margin: theme.spacing(1),
    width: '10em',
    height: '10em',
    backgroundColor: '#29c0a8',
  },
  form: {
    zIndex: 1000,
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    textAlign: 'center',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#29c0a8',
  },
  accountCirle: {
    fontSize: '9.5em',
    color: 'white',
  },
  backDrop: {
    backgroundColor: 'grey',
    position: 'absolute',
    height: '75%',
    width: '100%',
    bottom: 0,
    left: 0,
    zIndex: 0,
  },
}));

export default function LoginForm(props) {
  const classes = useStyles();
  const [error, setError] = useState('');

  return (
    <Router>
      <Container className="" component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <PersonIcon className={classes.accountCirle} />
          </Avatar>
          <form className={classes.form} noValidate>
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
            />
            {error ? (
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
              />
            )}
            <Grid container justify="center">
              <Grid item>
                <Link
                  href="#"
                  variant="body2"
                  component={RouterLink}
                  to="/signup"
                >
                  {'Not a member? Sign up'}
                </Link>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={props.onClick}
            >
              LOGIN
            </Button>
          </form>
        </div>
        <div className={classes.backDrop}></div>
      </Container>
    </Router>
  );
}
