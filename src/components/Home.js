import React, { useState, useEffect } from 'react';
import CategoryDropdown from './CategoryDropdown';
import BillCard from './Bill';
import Container from '@material-ui/core/Container';

// import { getBillsForCategory } from 'helpers/selectors';

const Home = (props) => {
  const [childCategory, setChildCategory] = useState(0);

  const bills = props.bills.filter((bill) => {
    return childCategory === 0 ? bill : bill.categories.includes(childCategory);
  });

  const billCards = bills.map((bill) => {
    return <BillCard key={bill.id} bill={bill} />;
  });

  // 	const handleChange = (category) => {
  // 		setChildCategory(category);
  // 	};

  return (
    <div>
      <Container maxWidth="sm">
        <CategoryDropdown
          categories={props.categories}
          passCategory={setChildCategory}
          // 					onChange={handleChange}
        />
        {billCards}
      </Container>
    </div>
  );
};
export default Home;
