import React from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// @material-ui/icons

// core components
import Header from 'components/Header/Header.js';
import Footer from 'components/Footer/Footer.js';
import GridContainer from 'components/Grid/GridContainer.js';
import HeaderLinks from 'components/Header/HeaderLinks.js';
import Parallax from 'components/Parallax/Parallax.js';
import Profile from './Profile';
import GridItem from 'components/Grid/GridItem.js';

import styles from 'assets/jss/material-kit-react/views/profilePage.js';

const useStyles = makeStyles(styles);

export default function ProfilePage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <Parallax small filter image={require('assets/img/profile-bg.jpg')}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem>
              <div className={classes.brand}>
                <h1
                  style={{
                    textAlign: 'center',
                    fontWeight: 900,
                    color: '#FFF'
                  }}
                >
                  My Profile
                </h1>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        {props.user && (
          <Profile
            user={props.user}
            handleProfileUpdate={props.handleProfileUpdate}
          />
        )}
      </div>
      <Footer />
    </div>
  );
}
