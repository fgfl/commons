import React, { useState, useEffect } from "react";
import axios from "axios";
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Parallax from "components/Parallax/Parallax.js";
// sections for this page
import HeaderLinks from "components/Header/HeaderLinks.js";

import styles from "assets/jss/material-kit-react/views/components.js";
import CategoryDropdown from "./CategoryDropdown";
import BillCard from "./Bill";

const useStyles = makeStyles(styles);

export default function Home(props) {
  const [user, setUser] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
  const [bills, setBills] = useState([]);
  const [categories, setCategories] = useState([]);
  const [events, setEvents] = useState([]);
  const [childCategory, setChildCategory] = useState(0);

  useEffect(() => {
    loginStatus();
    fetchBills();
  }, []);

  const loginStatus = () => {
    axios
      .get("http://localhost:3001/logged_in", { withCredentials: true })
      .then(response => {
        if (response.data.logged_in) {
          handleLogin(response.data);
        } else {
          handleLogout();
        }
      })
      .catch(error => console.log("api errors:", error));
  };

  const fetchBills = () => {
    axios
      .get("http://localhost:3001/bills")
      .then(response => {
        setBills(response.data.bills);
        setCategories(response.data.categories);
      })
      .catch(error => console.log("api errors:", error));
  };

  const handleLogin = data => {
    setUser(data.user);
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setUser({});
    setLoggedIn(false);
  };

  const handleProfileUpdate = user => {
    console.log(user);
    axios
      .put(
        `http://localhost:3001/users/${user.id}`,
        { user },
        { withCredentials: true }
      )
      .then(res => {
        console.log("done put for update user infor");
        setUser(user);
      })
      .catch(res => {
        console.error(`Failed setting profile: ${res}`);
      });
  };

  useEffect(() => console.log("Category ID: ", childCategory), [childCategory]);

  const billsArray = bills.filter(bill => {
    return childCategory === 0 ? bill : bill.categories.includes(childCategory);
  });

  const billCards = billsArray.map(bill => {
    return <BillCard key={bill.id} bill={bill} />;
  });

  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <Header
        brand="Commons"
        rightLinks={<HeaderLinks />}
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 400,
          color: "white"
        }}
        {...rest}
      />
      <Parallax image={require("assets/img/bg4.jpg")}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem>
              <div className={classes.brand}>
                <h1 className={classes.title}>Welcome to Commons</h1>
                <h3 className={classes.subtitle}>
                  Get informed. Stay engaged.
                </h3>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>

      <div className={classNames(classes.main, classes.mainRaised)}>
        <CategoryDropdown categories={categories} />
        {billCards}
      </div>
      <Footer />
    </div>
  );
}
