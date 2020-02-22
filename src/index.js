import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import App from "App.js";

import "assets/scss/material-kit-react.scss?v=1.8.0";

var history = createBrowserHistory();

ReactDOM.render(<App history={history} />, document.getElementById("root"));
