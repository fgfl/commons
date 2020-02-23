/*eslint-disable*/
import React, { Fragment } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
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

export default function HeaderLinks({ loggedIn }) {
  const classes = useStyles();
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Link to="/">
          <Button color="transparent" className={classes.navLink}>
            Home
          </Button>
        </Link>
      </ListItem>

      {loggedIn ? (
        <Fragment>
          <ListItem className={classes.listItem}>
            {/*<Tooltip title="Delete">
          <IconButton aria-label="Delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>*/}
            <Link to="/user/:id">
              <Button color="transparent" className={classes.navLink}>
                PROFILE
              </Button>
            </Link>
          </ListItem>

          <ListItem className={classes.listItem}>
            {/*<Tooltip title="Delete">
          <IconButton aria-label="Delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>*/}
            <Link to="/watch-list">
              <Button color="transparent" className={classes.navLink}>
                MY WATCH LIST
              </Button>
            </Link>
          </ListItem>
        </Fragment>
      ) : (
        <Fragment>
          <ListItem className={classes.listItem}>
            {/*<Tooltip title="Delete">
          <IconButton aria-label="Delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>*/}
            <Link to="/login-page">
              <Button color="transparent" className={classes.navLink}>
                LOGIN
              </Button>
            </Link>
          </ListItem>

          <ListItem className={classes.listItem}>
            {/*<Tooltip title="Delete">
          <IconButton aria-label="Delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>*/}
            <Link to="/signup-page">
              <Button color="transparent" className={classes.navLink}>
                SIGNUP
              </Button>
            </Link>
          </ListItem>
        </Fragment>
      )}
      {/* For testing purpose. Remove these last two afterwards  */}
      <Fragment>
        <ListItem className={classes.listItem}>
          <Link to="/user/:id">
            <Button color="transparent" className={classes.navLink}>
              PROFILE
            </Button>
          </Link>
        </ListItem>

        <ListItem className={classes.listItem}>
          <Link to="/watch-list">
            <Button color="transparent" className={classes.navLink}>
              MY WATCH LIST
            </Button>
          </Link>
        </ListItem>
      </Fragment>
    </List>
  );
}
