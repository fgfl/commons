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
import { Tooltip } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    border: 5,
    backgroundColor: 'red',
  },
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: 5,
    backgroundColor: 'white',
    padding: theme.spacing(2),
  },
  avatar: {
    margin: theme.spacing(1),
    width: '10em',
    height: '10em',
    backgroundColor: '#29c0a8',
  },
  form: {
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
  signUpLink: {
    margin: '0 auto',
  },
}));

export default function LoginForm() {
  const classes = useStyles();
  const [error, setError] = useState(true);

  return (
    <Container className={classes.container} component="main" maxWidth="xs">
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
          {error && <TextField error={true} fullWidth />}
          <Grid container justify="center">
            <Grid item>
              <Link href="#" variant="body2">
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
          >
            LOGIN
          </Button>
        </form>
      </div>
    </Container>
  );
}
