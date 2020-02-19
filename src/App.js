import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import NavBar from "./components/Nav";
import Home from "./components/Home";
import Watch from "./components/Watch";
import Login from "./components/registrations/Login";
import Signup from "./components/registrations/Signup";

function App() {
  return (
    <div>
      <Router>
        <NavBar />
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/Watch" component={Watch} />
      </Router>
    </div>
  );
}

export default App;
