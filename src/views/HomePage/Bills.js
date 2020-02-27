import React from 'react';
import BillCard from './BillCard';

export default function Bills(props) {
  const bills = props.bills.filter((bill) => {
    return props.childCategory === 0
      ? bill
      : bill.categories.includes(props.childCategory);
  });

  const sortedBills = bills.sort(
    (a, b) => b.introduced_date - a.introduced_date
  );

  console.log(sortedBills);

  const billCards = sortedBills.map((bill) => {
    return (
      <BillCard
        user={props.user}
        key={bill.id}
        bill={bill}
        setUser={props.setUser}
        updateWatchList={props.updateWatchList}
      />
    );
  });

  return billCards;
}
