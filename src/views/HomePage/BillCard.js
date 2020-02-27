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
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from '@material-ui/core/Snackbar';

import clsx from 'clsx';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: '16px'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'none',
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
    width: '75px',
    height: '75px',
    color: '#FFF',
    fontWeight: 900,
    boxShadow: '10px 17px 24px -13px rgba(0,0,0,0.5)',
    margin: '0 auto',
    marginBottom: theme.spacing(2)
  },
  status: {
    textAlign: 'center',
    marginBottom: theme.spacing(2)
  },
  pullRight: {
    justifyContent: 'flex-end',
    fontSize: '0.8em'
  }
}));

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
    props.user &&
    props.user.user_bills &&
    props.user.user_bills.includes(props.bill.id)
      ? setColor('red')
      : setColor('grey');
  }, []);

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

  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const introduced_date = new Date(props.bill.introduced_date);

  const eventCards =
    Array.isArray(events) &&
    events.map((event) => {
      const publication_date = new Date(event.publication_date);
      return (
        <CardContent>
          <Grid container justify='center'>
            <Grid
              item
              xs={0}
              sm={3}
              md={2}
              spacing={3}
              className={classes.status}
            ></Grid>
            <Grid item xs={4} sm={3} md={3}>
              <Typography body>
                <strong>
                  {publication_date.toLocaleDateString('en-US', options)}
                </strong>
              </Typography>
            </Grid>
            <Grid item xs={8} sm={6} md={7}>
              <Typography body>{event.title}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      );
    });

  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container justify='center'>
          <Grid
            item
            xs={6}
            sm={3}
            md={2}
            spacing={3}
            className={classes.status}
          >
            <Tooltip title='View Bill Page' placement='right'>
              <Button
                href={props.bill.page_url}
                variant='contained'
                className={classes.avatar}
                target='_blank'
              >
                Bill<br></br>
                {props.bill.code}
              </Button>
            </Tooltip>
            {props.bill.passed === true ? (
              <Button
                className={classes.billButtons}
                variant='contained'
                color='primary'
              >
                Passed
              </Button>
            ) : props.bill.passed === false ? (
              <Button
                className={classes.billButtons}
                variant='contained'
                color='secondary'
              >
                Defeated
              </Button>
            ) : (
              <Button
                className={classes.billButtons}
                variant='outlined'
                disabled
              >
                In Progress
              </Button>
            )}
          </Grid>
          <Grid item xs={10} sm={7} md={8}>
            <Typography>
              <strong>{props.bill.title}</strong>
            </Typography>
            <Typography style={{ marginBottom: '16px' }}>
              {'Introduced on ' +
                introduced_date.toLocaleDateString('en-US', options)}
            </Typography>
            <Grid container direction='row'>
              <Grid item xs={12}>
                <Typography
                  variant='body2'
                  color='textSecondary'
                  component='p'
                  style={{ marginBottom: '24px' }}
                >
                  {props.bill.description}
                </Typography>
                <Button
                  href={props.bill.full_text_url}
                  target='_blank'
                  variant='contained'
                >
                  Full Text
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={2} sm={2} md={2} style={{ textAlign: 'right' }}>
            {props.user ? (
              <IconButton aria-label='settings'>
                <BookmarkIcon
                  style={{ color: color }}
                  onClick={() => {
                    handleWatchSubmit();
                  }}
                />
              </IconButton>
            ) : (
              <Tooltip
                title='Sign in to add bills to watchlist.'
                placement='right'
              >
                <IconButton aria-label='settings'>
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
                            color='primary'
                            size='small'
                            onClick={handleClose}
                          >
                            Bill {props.bill.code} removed from watchlist
                          </Button>
                        ) : (
                          <Button
                            color='primary'
                            size='small'
                            onClick={handleClose}
                          >
                            Bill {props.bill.code} added to watchlist
                          </Button>
                        )}
                        <IconButton
                          size='small'
                          aria-label='close'
                          color='inherit'
                          onClick={handleClose}
                        >
                          <CloseIcon fontSize='small' />
                        </IconButton>
                      </React.Fragment>
                    }
                  />
                </IconButton>
              </Tooltip>
            )}
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing className={classes.pullRight}>
        <Typography variant='body'>View events for this bill</Typography>

        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label='show more'
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={0} sm={3} md={2} justify='flex-end'></Grid>
            <Grid
              item
              xs={12}
              sm={9}
              md={10}
              justify='flex-end'
              style={{ paddingRight: 'none' }}
            >
              <Typography variant='h4'>Bill Events</Typography>
            </Grid>
          </Grid>
        </CardContent>
        {eventCards}
      </Collapse>
    </Card>
  );
}
