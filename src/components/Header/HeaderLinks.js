/*eslint-disable*/
import React, { Fragment } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
// react components for routing our app without refresh
import { Link } from 'react-router-dom';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';

// @material-ui/icons
import { Apps, CloudDownload } from '@material-ui/icons';

// core components
import CustomDropdown from 'components/CustomDropdown/CustomDropdown.js';
import Button from 'components/CustomButtons/Button.js';

import styles from 'assets/jss/material-kit-react/components/headerLinksStyle.js';

const useStyles = makeStyles(styles);

export default function HeaderLinks({ user, loggedIn }) {
  console.log(user);
  const classes = useStyles();
  return (
    <List className={classes.list}>
      {loggedIn ? (
        <Fragment>
          <ListItem className={classes.listItem}>
            {user && (
              <Link to={`/user/${user.id}`}>
                <Button color='transparent' className={classes.navLink}>
                  PROFILE
                </Button>
              </Link>
            )}
          </ListItem>

          <ListItem className={classes.listItem}>
            <Link to='/watch-list'>
              <Button color='transparent' className={classes.navLink}>
                MY WATCH LIST
              </Button>
            </Link>
          </ListItem>
          <ListItem className={classes.listItem}>
            <Link to='/'>
              <Button color='transparent' className={classes.navLink}>
                LOG OUT
              </Button>
            </Link>
          </ListItem>
        </Fragment>
      ) : (
        <Fragment>
          <ListItem className={classes.listItem}>
            <Link to='/login-page'>
              <Button color='transparent' className={classes.navLink}>
                LOGIN
              </Button>
            </Link>
          </ListItem>

          <ListItem className={classes.listItem}>
            <Link to='/signup-page'>
              <Button color='transparent' className={classes.navLink}>
                SIGNUP
              </Button>
            </Link>
          </ListItem>
        </Fragment>
      )}
    </List>
  );
}
