import React, { useState } from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// react components for routing our app without refresh
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// @material-ui/icons
// core components
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import Parallax from 'components/Parallax/Parallax.js';

import styles from 'assets/jss/material-kit-react/views/components.js';
import CategoryDropdown from './CategoryDropdown';
import Bills from './Bills';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(styles);

export default function Home(props) {
  const classes = useStyles();

  const [childCategory, setChildCategory] = useState(0);

  return (
    <div>
      <Parallax image={require('assets/img/bg7.jpg')}>
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
        <Typography variant='h4' style={{ textAlign: 'center', margin: '1em' }}>
          See up to date information on bills in session in the House of
          Commons.
        </Typography>
        <CategoryDropdown
          categories={props.categories}
          passCategory={setChildCategory}
        />
        <Bills
          user={props.user}
          bills={props.bills}
          childCategory={childCategory}
          setUser={props.setUser}
          updateWatchList={props.updateWatchList}
        />
      </div>
    </div>
  );
}
