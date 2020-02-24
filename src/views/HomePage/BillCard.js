import React, { useState } from 'react';
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
import clsx from 'clsx';

import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'left',
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
    width: '60px',
    height: '60px',
    fontWeight: 900
  }
}));

export default function Bill(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [events, setEvents] = useState('No events currently loaded.');

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
      console.error(
        `Error occured while fetching events for bill ${props.bill.code}`
      );
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
          <Typography paragraph>{event.title}</Typography>
          <Typography paragraph>{event.publication_date}</Typography>
        </CardContent>
      );
    });

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <div>
            <Avatar aria-label="bill" className={classes.avatar}>
              {props.bill.code}
            </Avatar>
            <Typography
              color="textSecondary"
              style={{ fontSize: '0.75em', textAlign: 'center' }}
            >
              Second <br /> Reading
            </Typography>
          </div>
        }
        action={
          <IconButton aria-label="settings">
            <BookmarkIcon
              onClick={() => {
                props.setThisOneClicked(props.key);
                console.log('I was clicked');
              }}
            />
          </IconButton>
        }
        title={props.bill.title}
        subheader={'Introduced on ' + props.bill.introduced_date}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.bill.description}
        </Typography>
        <Typography>
          <Link href={props.bill.page_url}>Bill Page</Link>
        </Typography>
        <Typography>
          <Link href={props.bill.full_text_url}>Full Text</Link>
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Typography>View Events for this Bill</Typography>
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
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>{eventCards}</CardContent>
      </Collapse>
    </Card>
  );
}
