import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import NavBar from './components/Nav';
import Home from './components/Home';
import Watch from './components/Watch';
import Login from './components/registrations/Login';
import Signup from './components/registrations/Signup';
import Profile from './components/profile/Profile';

function App() {
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    loginStatus();
  }, []);

  const loginStatus = () => {
    axios
      .get('http://localhost:3001/logged_in', { withCredentials: true })
      .then((response) => {
        if (response.data.logged_in) {
          handleLogin(response);
        } else {
          handleLogout();
        }
      })
      .catch((error) => console.log('api errors:', error));
  };

  const handleLogin = (data) => {
    setUser(data.user);
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setUser({});
    setLoggedIn(false);
  };

  const handleProfileUpdate = (newUserInfo) => {
    console.log(newUserInfo);
    axios
      .put(`http://localhost:3001/api/users/${user.id}`, { newUserInfo })
      .then((res) => {
        console.log('done put for update user infor');
        setUser(newUserInfo);
      })
      .catch((res) => {
        console.error(`Failed setting profile: ${res}`);
      });
  };

  return (
    <div>
      <Router>
        <NavBar handleLogout history loggedIn />
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <Home
                {...props}
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
              <Signup
                {...props}
                handleLogin={handleLogin}
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
}

export default App;
