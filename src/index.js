import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import App from 'App.js';
import axios from 'axios';

import 'assets/scss/material-kit-react.scss?v=1.8.0';

axios.defaults.withCredentials = true;

var history = createBrowserHistory();

ReactDOM.render(<App history={history} />, document.getElementById('root'));
