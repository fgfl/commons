import React from 'react';
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
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <div>
            <Avatar aria-label='bill' className={classes.avatar}>
              {props.bill.code}
            </Avatar>
            <Typography
              color='textSecondary'
              style={{ fontSize: '0.75em', textAlign: 'center' }}
            >
              Second <br /> Reading
            </Typography>
          </div>
        }
        action={
          <IconButton aria-label='settings'>
            <BookmarkIcon />
          </IconButton>
        }
        title={props.bill.title}
        subheader={'Introduced on ' + props.bill.introduced_date}
      />
      <CardContent>
        <Typography variant='body2' color='textSecondary' component='p'>
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
          <Typography paragraph>Summary:</Typography>
          <Typography paragraph>
            The general provisions of the enactment set out rules of
            interpretation and specify that no recourse is to be taken on the
            basis of sections 9 to 20 or any order made under those sections, or
            on the basis of the provisions of the Agreement, without the consent
            of the Attorney General of Canada.
          </Typography>
          <Typography paragraph>
            Part 1 approves the Agreement, provides for the payment by Canada of
            its share of the expenditures associated with the operation of the
            institutional and administrative aspects of the Agreement and gives
            the Governor in Council the power to make orders in accordance with
            the Agreement.
          </Typography>
          <Typography paragraph>
            Part 2 amends certain Acts to bring them into conformity with
            Canada’s obligations under the Agreement.
          </Typography>
          <Typography paragraph>
            Part 3 contains the coming into force provisions.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
