import React, { useState, useEffect } from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// react components for routing our app without refresh
import { Link } from 'react-router-dom';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// @material-ui/icons
// core components
import Header from 'components/Header/Header.js';
import Footer from 'components/Footer/Footer.js';
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import Parallax from 'components/Parallax/Parallax.js';
// sections for this page
import HeaderLinks from 'components/Header/HeaderLinks.js';

import styles from 'assets/jss/material-kit-react/views/components.js';
import CategoryDropdown from '../HomePage/CategoryDropdown';
import Bills from '../HomePage/Bills';
import image from 'assets/img/bg2.jpg';

const useStyles = makeStyles(styles);

export default function WatchListPage(props) {
  const [clicked, setClicked] = useState({});
  const classes = useStyles();
  const { ...rest } = props;

  const [childCategory, setChildCategory] = useState(0);

  useEffect(() => console.log('Category ID: ', childCategory), [childCategory]);

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

  return (
    <div>
      <Header
        brand="Commons"
        rightLinks={
          <HeaderLinks user={props.user} loggedIn={props.loggedInStatus} />
        }
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 400,
          color: 'white',
        }}
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: 'url(' + image + ')',
          backgroundSize: 'cover',
          backgroundPosition: 'top center',
        }}
      ></div>
      <Parallax image={require('assets/img/bg2.jpg')}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem></GridItem>
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
