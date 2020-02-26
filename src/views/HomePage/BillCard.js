import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';

import clsx from 'clsx';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: '16px'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  avatar: {
    backgroundColor: red[500],
    borderRadius: '100%',
    height: '9vw',
    width: '9vw',
    color: '#FFF',
    fontSize: '1.5vw',
    fontWeight: 900,
    boxShadow: '10px 17px 24px -13px rgba(0,0,0,0.5)',
    marginRight: '5%',
    marginTop: '5%',
    marginBottom: '5%'
  },
  title: {
    paddingTop: '3%',
    fontSize: '1.5vw'
  },
  introduced: {
    fontSize: '1.25vw'
  },
  description: {
    paddingTop: '2%',
    fontSize: '1.25vw'
  },
  billButtons: {
    width: '128px',
    marginTop: '10px'
  },
  event: {
    fontSize: '1.25vw'
  }
}));

const button = {
  boxShadow: 'inset 0 0 15px rgba(55, 84, 170,0)',
  boxShadow: 'inset 0 0 20px rgba(255, 255, 255,0)',
  boxShadow: '7px 7px 15px rgba(55, 84, 170,.15)',
  boxShadow: '-7px -7px 20px rgba(255, 255, 255,1)',
  boxShadow: 'inset 0px 0px 4px rgba(255, 255, 255,.2)'
};

/**
 *
 * @param {{
 *  key: Number,
 *  setThisOneClicked: (),
 *  bill: { bill_state },
 *  style: { style_object },
 *  onRender: ()
 * }} props
 */
export default function BillCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [events, setEvents] = useState('No events currently loaded.');
  const [color, setColor] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    props.user && findWatchedBills(props.user.id);
    props.user &&
    props.user.user_bills &&
    props.user.user_bills.includes(props.bill.id)
      ? setColor('red')
      : setColor('grey');
  }, []);

  const findWatchedBills = async (user_id) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_COMMONS_API}/bills/${user_id}`
      );
      let watchedBills = response.data.user_bills;
      if (watchedBills.includes(props.bill.id)) {
        setColor('red');
      }
    } catch (error) {
      console.error(`Error occurred on findWatchedBills: ${error}`);
    }
  };

  const handleWatchSubmit = async () => {
    const watchlist_bill = {
      id: { bill_id: props.bill.id, user_id: props.user.id }
    };
    color === 'grey' ? setColor('red') : setColor('grey');

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_COMMONS_API}/bill_users`,
        watchlist_bill
      );
      props.updateWatchList(response.data.watchlist);
      response.data.watchlist.includes(props.bill.id)
        ? setColor('red')
        : setColor('grey');
      setOpen(true);
    } catch (error) {
      console.error(`Error occurred on handleWatchSubmit: ${error}`);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
    getEventsForBill(props.bill.id);
  };
  const getEventsForBill = async (bill_id) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_COMMONS_API}/events/${bill_id}`,
        {
          bill_id
        }
      );
      setEvents(response.data.events);
    } catch (error) {
      console.error(`Error occurred on getEventsForBill: ${props.bill.code}`);
    }
  };

  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const introduced_date = new Date(props.bill.introduced_date);

  const eventCards =
    Array.isArray(events) &&
    events.map((event) => {
      const publication_date = new Date(event.publication_date);

      return (
        <CardContent key={event.id}>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            textAlign="left"
            pl={0}
          >
            <Grid item xs={3}>
              <Typography body className={classes.event}>
                <strong>
                  {publication_date.toLocaleDateString('en-US', options)}
                </strong>
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography body className={classes.event}>
                {event.title}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      );
    });

  return (
    <Card className={classes.root} variant="outlined">
      <Grid
        container
        xs={12}
        spacing={2}
        direction="row"
        justify="space-around"
        alignItems="center"
      >
        <Grid
          item
          xs={2}
          justify="center"
          alignItems="flex-end"
          style={{ textAlign: 'center' }}
        >
          <Tooltip title="View Bill Page" placement="bottom">
            <Button
              style={button}
              href={props.bill.page_url}
              variant="contained"
              className={classes.avatar}
              target="_blank"
            >
              Bill<br></br>
              {props.bill.code}
            </Button>
          </Tooltip>
          <Button
            className={classes.billButtons}
            href={props.bill.full_text_url}
            target="_blank"
            variant="contained"
          >
            Full Text
          </Button>
          <br></br>
          {props.bill.passed === true ? (
            <Button
              className={classes.billButtons}
              variant="contained"
              color="primary"
            >
              Passed
            </Button>
          ) : props.bill.passed === false ? (
            <Button
              className={classes.billButtons}
              variant="contained"
              color="secondary"
            >
              Defeated
            </Button>
          ) : (
            <Button className={classes.billButtons} variant="outlined" disabled>
              In Progress
            </Button>
          )}
        </Grid>
        <Grid container direction="column" xs>
          <Grid
            container
            direction="row"
            justify="space-between"
            align-items="flex-start"
            xs={14}
          >
            <Grid item xs={11}>
              <Typography className={classes.title}>
                <strong>{props.bill.title}</strong>
              </Typography>
              <Typography className={classes.introduced}>
                {'Introduced on ' +
                  introduced_date.toLocaleDateString('en-US', options)}
              </Typography>
            </Grid>
            <Grid item xs style={{ float: 'right' }}>
              {props.user ? (
                <IconButton
                  aria-label="settings"
                  onClick={() => {
                    handleWatchSubmit();
                  }}
                >
                  <BookmarkIcon style={{ color: color }} />
                  <Snackbar
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center'
                    }}
                    open={open}
                    autoHideDuration={2000}
                    onClose={handleClose}
                    action={
                      <React.Fragment>
                        {color === 'grey' ? (
                          <Button
                            color="primary"
                            size="small"
                            onClick={handleClose}
                          >
                            Bill {props.bill.code} removed from watchlist
                          </Button>
                        ) : (
                          <Button
                            color="primary"
                            size="small"
                            onClick={handleClose}
                          >
                            Bill {props.bill.code} added to watchlist
                          </Button>
                        )}
                        <IconButton
                          size="small"
                          aria-label="close"
                          color="inherit"
                          onClick={handleClose}
                        >
                          <CloseIcon fontSize="small" />
                        </IconButton>
                      </React.Fragment>
                    }
                  />
                </IconButton>
              ) : (
                <Tooltip
                  title="Sign in to add bills to watchlist."
                  placement="right"
                >
                  <IconButton aria-label="settings">
                    <BookmarkIcon style={{ color: color }} />
                  </IconButton>
                </Tooltip>
              )}
            </Grid>
            <Grid item direction="row">
              <Grid item xs={10}>
                {props.bill.description ? (
                  <Typography
                    className={classes.description}
                    variant="body2"
                    color="textPrimary"
                    component="p"
                    style={{ marginBottom: '24px' }}
                  >
                    {props.bill.description}
                  </Typography>
                ) : (
                  <Typography
                    className={classes.description}
                    variant="body2"
                    color="textDisabled"
                    component="p"
                    style={{ marginBottom: '24px' }}
                    width="100%"
                  >
                    <em>No description is available for this bill.</em>
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <CardActions disableSpacing>
        <Tooltip title="View Events for this Bill" placement="right">
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
        >
          <Grid item xs={2}></Grid>
          <Grid item xs={10}>
            <Typography variant="h5">Bill Events</Typography>
            {eventCards}
          </Grid>
        </Grid>
      </Collapse>
    </Card>
  );
}
