import React from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
// @material-ui/icons
import Email from '@material-ui/icons/Email';
import People from '@material-ui/icons/People';
// core components
import Header from 'components/Header/Header.js';
import HeaderLinks from 'components/Header/HeaderLinks.js';
import Footer from 'components/Footer/Footer.js';
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import Button from 'components/CustomButtons/Button.js';
import Card from 'components/Card/Card.js';
import UserForm from './UserForm';

import styles from 'assets/jss/material-kit-react/views/loginPage.js';

import image from 'assets/img/bg7.jpg';

const useStyles = makeStyles(styles);

export default function LoginPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState('cardHidden');
  setTimeout(function() {
    setCardAnimation('');
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <Header
        absolute
        color='transparent'
        brand='Commons'
        rightLinks={
          <HeaderLinks user={props.user} loggedIn={props.loggedInStatus} />
        }
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: 'url(' + image + ')',
          backgroundSize: 'cover',
          backgroundPosition: 'top center'
        }}
      >
        <div className={classes.container}>
          <Container maxWidth='xs'>
            <GridItem>
              <Card className={classes[cardAnimaton]}>
                <UserForm
                  categories={props.categories}
                  handleLogin={props.handleLogin}
                  loggedInStatus={props.loggedIn}
                />
              </Card>
            </GridItem>
          </Container>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
}
