import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';

import Home from 'views/HomePage/Home.js';
// import LandingPage from "views/LandingPage/LandingPage.js";
import ProfilePage from 'views/ProfilePage/ProfilePage.js';
import LoginPage from 'views/LoginPage/LoginPage.js';
import SignupPage from 'views/SignupPage/SignupPage.js';
import WatchListPage from 'views/WatchListPage/WatchListPage.js';
import Header from 'components/Header/Header';
import HeaderLinks from 'components/Header/HeaderLinks';

const App = (props) => {
  const [user, setUser] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
  const [bills, setBills] = useState([]);
  const [categories, setCategories] = useState([]);
  // const [events, setEvents] = useState([]);

  // Loads initial page state and fetches bills/categories
  useEffect(() => {
    loginStatus();
    fetchBills();
  }, []);

  // Fetches bills from the Rails back end
  const fetchBills = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_COMMONS_API}/bills`
      );
      setBills(response.data.bills);
      setCategories(response.data.categories);
    } catch (error) {
      console.error('Error occured on fetchBills:', error);
    }
  };

  const loginStatus = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_COMMONS_API}/logged_in`
      );
      if (response.data.logged_in) {
        handleLogin(response.data);
        console.log(user);
      } else {
        handleLogout();
      }
    } catch (error) {
      console.error('Error occured on loginStatus:', error);
    }
  };

  const handleProfileUpdate = async (user) => {
    console.log(user);
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_COMMONS_API}/users/${user.id}`,
        {
          user
        }
      );
      if (res.data.status === 200) {
        console.log('res 200');
        setUser(user);
      } else {
        console.error(`Failed setting profile: ${res.data.errors}`);
      }
    } catch (error) {
      console.error(`Failed setting profile: ${error}`);
    }
  };

  // Login/logout handlers
  const handleLogin = (data) => {
    setUser(data.user);
    setLoggedIn(true);
  };

  const handleLogout = () => {
    axios
      .delete(`${process.env.REACT_APP_COMMONS_API}/logout`)
      .then((response) => {
        setUser({});
        setLoggedIn(false);
        props.history.push('/');
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <Router history={props.hist}>
        <Header
          color="transparent"
          brand="Commons"
          // rightLinks={<HeaderLinks user={user} loggedIn={loggedIn} />}
          fixed
          changeColorOnScroll={{
            height: 200,
            color: 'white'
          }}
          user={user}
          loggedIn={loggedIn}
          handleLogout={handleLogout}
          {...props}
        />
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <Home
                {...props}
                bills={bills}
                categories={categories}
                handleLogout={handleLogout}
                loggedInStatus={loggedIn}
                user={user}
              />
            )}
          />
          <Route
            path="/login-page"
            render={(props) => (
              <LoginPage
                {...props}
                handleLogin={handleLogin}
                loggedInStatus={loggedIn}
                history={props.history}
              />
            )}
          />
          <Route
            path="/signup-page"
            render={(props) => (
              <SignupPage
                {...props}
                categories={categories}
                handleLogin={handleLogin}
                loggedInStatus={loggedIn}
              />
            )}
          />
          <Route
            path="/watch-list"
            render={(props) => (
              <WatchListPage
                {...props}
                bills={bills}
                categories={categories}
                handleLogin={handleLogin}
                loggedInStatus={loggedIn}
              />
            )}
          />
          <Route
            path="/user/:id"
            render={() => (
              <ProfilePage
                user={user}
                handleProfileUpdate={handleProfileUpdate}
                loggedInStatus={loggedIn}
              />
            )}
          />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
