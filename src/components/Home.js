import React from 'react';
import CategoryDropdown from './CategoryDropdown';
import BillCard from './Bill';
import Container from '@material-ui/core/Container';

const Home = (props) => {
	const billCards = props.bills.map((bill) => {
		return <BillCard key={bill.id} bill={bill} />;
	});

	return (
		<div>
			<Container maxWidth='sm'>
				<CategoryDropdown categories={props.categories} />
				{billCards}
			</Container>
		</div>
	);
};
export default Home;
