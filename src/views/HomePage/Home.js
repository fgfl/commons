import React, { useState, useEffect } from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// react components for routing our app without refresh
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// @material-ui/icons
// core components
import Header from 'components/Header/Header.js';
import Footer from 'components/Footer/Footer.js';
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import Button from 'components/CustomButtons/Button.js';
import Parallax from 'components/Parallax/Parallax.js';
// sections for this page
import HeaderLinks from 'components/Header/HeaderLinks.js';

import styles from 'assets/jss/material-kit-react/views/components.js';
import CategoryDropdown from './CategoryDropdown';
import Bills from './Bills';

const useStyles = makeStyles(styles);

export default function Home(props) {
	const [clicked, setClicked] = useState({});
	const classes = useStyles();
	const { ...rest } = props;

	const setThisOneClicked = (key) => {
		setClicked((prev) => {
			let state = { ...prev };
			if (state[key]) {
				delete state[key];
			} else {
				state[key] = true;
			}
			return state;
		});
	};

	const setBillToWatch = () => {};

	const [childCategory, setChildCategory] = useState(0);

	return (
		<div>
			<Header
				brand='Commons'
				rightLinks={<HeaderLinks />}
				fixed
				color='transparent'
				changeColorOnScroll={{
					height: 400,
					color: 'white'
				}}
				{...rest}
			/>
			<Parallax
				image={require('assets/img/erik-mclean-f7wX87Zs4fU-unsplash.jpg')}
			>
				<div className={classes.container}>
					<GridContainer>
						<GridItem>
							<div className={classes.brand}>
								<h1 className={classes.title}>Commons</h1>
								<h3 className={classes.subtitle}>
									Get informed. Stay engaged.
								</h3>
							</div>
						</GridItem>
					</GridContainer>
				</div>
			</Parallax>

			<div className={classNames(classes.main, classes.mainRaised)}>
				<CategoryDropdown
					categories={props.categories}
					passCategory={setChildCategory}
				/>
				<Bills
					bills={props.bills}
					clicked={clicked}
					setThisOneClicked={setThisOneClicked}
				/>
			</div>
			<Footer />
		</div>
	);
}
