import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";

import Home from "views/Components/Home.js";
// import LandingPage from "views/LandingPage/LandingPage.js";
import ProfilePage from "views/ProfilePage/ProfilePage.js";
import LoginPage from "views/LoginPage/LoginPage.js";
import UserForm from "views/SignupPage/SignupPage.js";
import WatchListPage from "views/WatchListPage/WatchListPage.js";

const App = props => {
  console.log(props.history);
  const [user, setUser] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
  const [bills, setBills] = useState([]);
  const [categories, setCategories] = useState([]);
  const [events, setEvents] = useState([]);

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

  return (
    <div>
      <Router history={props.hist}>
        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <Home
                {...props}
                bills={bills}
                categories={categories}
                handleLogout={handleLogout}
                loggedInStatus={loggedIn}
              />
            )}
          />
          {/* <Route path="/landing-page" component={LandingPage} /> */}
          {/* <Route path="/profile-page" component={ProfilePage} /> */}
          <Route
            path="/login-page"
            render={props => (
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
            render={props => (
              <UserForm
                {...props}
                categories={categories}
                handleLogin={handleLogin}
                loggedInStatus={loggedIn}
              />
            )}
          />
          <Route path="/watch-list" component={WatchListPage} />
          <Route
            path="/user/:id"
            render={() => (
              <ProfilePage
                user={user}
                handleProfileUpdate={handleProfileUpdate}
              />
            )}
          />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
