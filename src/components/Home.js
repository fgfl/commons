import React, { useState, useEffect } from 'react';
import CategoryDropdown from './CategoryDropdown';
import BillCard from './Bill';
import Container from '@material-ui/core/Container';

// import { getBillsForCategory } from 'helpers/selectors';

const Home = (props) => {
	const [childCategory, setChildCategory] = useState('All Categories');
	// const billCards = props.bills.map((bill) => {
	// 	return <BillCard key={bill.id} bill={bill} />;
	// });
	const billCards = props.bills.map((bill) => {
		return <BillCard key={bill.id} bill={bill} />;
	});

	useEffect(() => console.log('CATEGORY', childCategory), [childCategory]);

	const handleChange = (category) => {
		setChildCategory(category);
	};

	return (
		<div>
			<Container maxWidth='sm'>
				<CategoryDropdown
					categories={props.categories}
					passCategory={setChildCategory}
					onChange={handleChange}
				/>
				{billCards}
			</Container>
		</div>
	);
};
export default Home;
