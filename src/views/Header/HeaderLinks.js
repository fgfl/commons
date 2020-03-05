/*eslint-disable*/
import React, { Fragment } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
// react components for routing our app without refresh
import { Link } from 'react-router-dom';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText } from '@material-ui/core';

// core components
import Button from 'components/CustomButtons/Button.js';

import styles from 'assets/jss/material-kit-react/components/headerLinksStyle.js';

const useStyles = makeStyles(styles);

export default function HeaderLinks({
  user,
  loggedIn,
  handleDrawerToggle,
  handleLogout
}) {
  const classes = useStyles();

  const handleLogoutClick = (e) => {
    handleLogout();
    handleDrawerToggle();
  };

  return (
    <List className={classes.list}>
      {loggedIn ? (
        <Fragment>
          <ListItem className={classes.listItem}>
            {user && (
              <Link to={`/user/${user.id}`}>
                <Button
                  color="transparent"
                  className={classes.navLink}
                  onClick={handleDrawerToggle}
                >
                  PROFILE
                </Button>
              </Link>
            )}
          </ListItem>

          <ListItem className={classes.listItem}>
            <Link to="/watch-list">
              <Button
                color="transparent"
                className={classes.navLink}
                onClick={handleDrawerToggle}
              >
                MY WATCH LIST
              </Button>
            </Link>
          </ListItem>
          <ListItem className={classes.listItem}>
            <Link to="/">
              <Button
                color="transparent"
                className={classes.navLink}
                onClick={handleLogoutClick}
              >
                LOG OUT
              </Button>
            </Link>
          </ListItem>
        </Fragment>
      ) : (
        <Fragment>
          <ListItem className={classes.listItem}>
            <Link to="/login-page">
              <Button
                color="transparent"
                className={classes.navLink}
                onClick={handleDrawerToggle}
              >
                LOGIN
              </Button>
            </Link>
          </ListItem>

          <ListItem className={classes.listItem}>
            <Link to="/signup-page">
              <Button
                color="transparent"
                className={classes.navLink}
                onClick={handleDrawerToggle}
              >
                SIGNUP
              </Button>
            </Link>
          </ListItem>
        </Fragment>
      )}
    </List>
  );
}
