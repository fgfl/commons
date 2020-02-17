import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import BookmarkIcon from "@material-ui/icons/Bookmark";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    fontWeight: 900,
    fontFamily: "Prompt",
    fontSize: "1.5em"
  },
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  },
  bar: {
    backgroundColor: "#F00"
  }
}));

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false
  });

  const toggleDrawer = (side, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
      display="flex"
      alignItems="center"
    >
      <List>
        <ListItem button>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText>Login</ListItemText>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <PersonAddIcon />
          </ListItemIcon>
          <ListItemText>Signup</ListItemText>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <BookmarkIcon />
          </ListItemIcon>
          <ListItemText>My Watch List</ListItemText>
        </ListItem>
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.bar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            commons
          </Typography>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon onClick={toggleDrawer("right", true)} />
          </IconButton>
          <Drawer
            anchor="right"
            open={state.right}
            onClose={toggleDrawer("right", false)}
          >
            {sideList("right")}
          </Drawer>
        </Toolbar>
      </AppBar>
    </div>
  );
}
