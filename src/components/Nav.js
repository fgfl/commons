import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import { Link } from 'react-router-dom';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background:
      "linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.35) 59%, rgba(0, 0, 0, 0.65) 100%), url('https://upload.wikimedia.org/wikipedia/commons/d/d7/House_of_Commons_Chamber_1.png') no-repeat",
    backgroundSize: 'cover',
    width: '100%',
    height: '200px',
    textAlign: 'center',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontWeight: 900,
    fontFamily: 'Prompt',
    fontSize: '2em',
    width: '100%',
    backgroundColor: '#F00',
  },
  tagline: {
    flexGrow: 1,
    fontSize: '1em',
    width: '100%',
    backgroundColor: '#F00',
    paddingBottom: '2em',
  },
  list: {
    width: 250,
    boxShadow: 0,
  },
  fullList: {
    width: 'auto',
  },
  bar: {
    background: 'rgba(0,0,0,0)',
    boxShadow: 'none',
  },
  hamburger: {
    backgroundColor: '#F00',
    padding: '0.30em',
  },
}));

const NavBar = (props) => {
  const handleClick = () => {
    axios
      .delete('http://localhost:3001/logout', { withCredentials: true })
      .then((response) => {
        props.handleLogout();
        console.log('logged out');
        props.history.push('/');
      })
      .catch((error) => console.log(error));
  };
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (side, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const sideList = (side) => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      {props.loggedIn ? (
        <Typography>Logged in as: {props.user.name}</Typography>
      ) : (
        <Typography>Please login</Typography>
      )}
      <List>
        <Link to="/">
          <ListItem button>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText>Home</ListItemText>
          </ListItem>
        </Link>
        {props.loggedIn && (
          <Link to={`/user/${props.user.id}`}>
            <ListItem button>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText>Profile</ListItemText>
            </ListItem>
          </Link>
        )}
        <Link to="/logout" onClick={handleClick}>
          <ListItem button>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText>Log Out</ListItemText>
          </ListItem>
        </Link>
        <Link to="/login">
          <ListItem button>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText>Log In</ListItemText>
          </ListItem>
        </Link>

        <Link to="/signup">
          <ListItem button>
            <ListItemIcon>
              <PersonAddIcon />
            </ListItemIcon>
            <ListItemText>Sign Up</ListItemText>
          </ListItem>
        </Link>
        <Link to="/watch">
          <ListItem button>
            <ListItemIcon>
              <BookmarkIcon />
            </ListItemIcon>
            <ListItemText>My Watch List</ListItemText>
          </ListItem>
        </Link>
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.bar}>
        <Toolbar className={classes.tool}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon
              className={classes.hamburger}
              onClick={toggleDrawer('right', true)}
            />
          </IconButton>
          <Drawer
            anchor="right"
            open={state.right}
            onClose={toggleDrawer('right', false)}
          >
            {sideList('right')}
          </Drawer>
        </Toolbar>
        <Typography style={{ fontSize: '1.5em' }}>Welcome to</Typography>
        <Typography className={classes.title}>commons</Typography>
        <Typography className={classes.tagline}>
          Stay informed. Get engaged
        </Typography>
      </AppBar>
    </div>
  );
};

export default NavBar;
