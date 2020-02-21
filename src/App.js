import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import NavBar from './components/Nav';
import Home from './components/Home';
import Watch from './components/Watch';
import Login from './components/registrations/Login';
import UserForm from './components/registrations/Signup/UserForm';
import Profile from './components/profile/Profile';

const App = () => {
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
      .get('http://localhost:3001/logged_in', { withCredentials: true })
      .then((response) => {
        if (response.data.logged_in) {
          handleLogin(response.data);
        } else {
          handleLogout();
        }
      })
      .catch((error) => console.log('api errors:', error));
  };

  const fetchBills = () => {
    axios
      .get('http://localhost:3001/bills')
      .then((response) => {
        setBills(response.data.bills);
        setCategories(response.data.categories);
      })
      .catch((error) => console.log('api errors:', error));
  };

  const handleLogin = (data) => {
    console.log(data.user);
    setUser(data.user);
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setUser({});
    setLoggedIn(false);
  };

  const handleProfileUpdate = (user) => {
    axios
      .put(
        `http://localhost:3001/users/${user.id}`,
        { user },
        { withCredentials: true }
      )
      .then((res) => {
        console.log('done put for update user infor');
        setUser(user);
      })
      .catch((res) => {
        console.error(`Failed setting profile: ${res}`);
      });
  };

  return (
    <div>
      <Router>
        <NavBar user={user} handleLogout={handleLogout} loggedIn={loggedIn} />
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
              />
            )}
          />
          <Route
            exact
            path="/login"
            render={(props) => (
              <Login
                {...props}
                handleLogin={handleLogin}
                loggedInStatus={loggedIn}
              />
            )}
          />
          <Route
            exact
            path="/signup"
            render={(props) => (
              <UserForm
                {...props}
                handleLogin={handleLogin}
                loggedInStatus={loggedIn}
              />
            )}
          />
          <Route
            exact
            path="/logout"
            render={(props) => (
              <Home
                {...props}
                handleLogin={handleLogout}
                loggedInStatus={loggedIn}
              />
            )}
          />
          <Route path="/Watch" component={Watch} />
          <Route
            path="/user/:id"
            render={() => (
              <Profile
                user={user}
                handleProfileUpdate={handleProfileUpdate}
              ></Profile>
            )}
          />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
