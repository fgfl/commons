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
    fontWeight: 900,
    boxShadow: '10px 17px 24px -13px rgba(0,0,0,0.5)',
    margin: '0 auto',
    marginTop: '5%',
    marginBottom: '5%'
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
    } catch (error) {
      console.error(`Error occurred on handleWatchSubmit: ${error}`);
    }
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

  const handleExpandClick = () => {
    setExpanded(!expanded);
    getEventsForBill(props.bill.id);
  };

  const eventCards =
    Array.isArray(events) &&
    events.map((event) => {
      return (
        <CardContent key={event.id}>
          <Grid container spacing={3}>
            <Grid item xs={3} style={{ textAlign: 'center' }}>
              <Typography body>
                <strong>{event.publication_date}</strong>
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography body>{event.title}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      );
    });

  return (
    <Card className={classes.root} variant="outlined">
      <Grid
        container
        spacing={2}
        direction="row"
        justify="space-around"
        alignItems="center"
      >
        <Grid
          item
          xs={2}
          spacing={4}
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
            href={props.bill.full_text_url}
            target="_blank"
            variant="contained"
          >
            Full Text
          </Button>
        </Grid>
        <Grid container direction="column" xs={10}>
          <Grid container direction="row" justify="space-between" xs={14}>
            <Grid item xs={9}>
              <Typography>
                <strong>{props.bill.title}</strong>
              </Typography>
              <Typography>
                {'Introduced on ' + props.bill.introduced_date}
              </Typography>
            </Grid>
            <Grid item xs={1} style={{ float: 'right' }}>
              {props.user ? (
                <IconButton
                  aria-label="settings"
                  onClick={() => {
                    handleWatchSubmit();
                  }}
                >
                  <BookmarkIcon style={{ color: color }} />
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
              <Grid item xs={10}></Grid>
              <Grid item xs={10}>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  style={{ marginBottom: '24px' }}
                >
                  {props.bill.description}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <CardActions disableSpacing>
        {/* <Typography>View Events for this Bill</Typography> */}
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
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={3}></Grid>
            <Grid item xs={9}>
              <Typography variant="h4">Bill Events</Typography>
            </Grid>
          </Grid>
        </CardContent>

        {eventCards}
      </Collapse>
    </Card>
  );
}
