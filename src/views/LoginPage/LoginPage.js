import React from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
// core components
import Footer from 'components/Footer/Footer.js';
import GridItem from 'components/Grid/GridItem.js';
import Card from 'components/Card/Card.js';
import Login from './Login.js';

import styles from 'assets/jss/material-kit-react/views/loginPage.js';

import image from 'assets/img/house_of_commons.jpg';

const useStyles = makeStyles(styles);

export default function LoginPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState('cardHidden');

  setTimeout(function() {
    setCardAnimation('');
  }, 700);

  const classes = useStyles();

  return (
    <div
      className={classes.pageHeader}
      style={{
        backgroundImage: 'url(' + image + ')',
        backgroundSize: 'cover',
        backgroundPosition: 'top center',
      }}
    >
      <div className={classes.container}>
        <Container maxWidth="xs">
          <GridItem>
            <Card className={classes[cardAnimaton]}>
              <Login
                handleLogin={props.handleLogin}
                loggedInStatus={props.loggedInStatus}
                history={props.history}
              />
            </Card>
          </GridItem>
        </Container>
      </div>
      <Footer whiteFont />
    </div>
  );
}
