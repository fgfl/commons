import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import BillCard from './BillCard';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'left',
    marginBottom: '16px',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
    width: '60px',
    height: '60px',
    fontWeight: 900,
  },
}));

export default function Bills(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const bills = props.bills.filter((bill) => {
    return props.childCategory === 0
      ? bill
      : bill.categories.includes(props.childCategory);
  });

  const billCards = bills.map((bill) => {
    let color = props.clicked[bill.id] ? 'red' : 'grey';
    return (
      <BillCard
        key={bill.id}
        setThisOneClicked={props.setThisOneClicked}
        bill={bill}
        style={{ color: color }}
      />
    );
  });

  return billCards;
}
