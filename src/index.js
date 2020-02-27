import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import App from 'App.js';
import axios from 'axios';

import 'assets/scss/material-kit-react.scss?v=1.8.0';

axios.defaults.withCredentials = true;

var history = createBrowserHistory();

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Lato',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif'
    ].join(',')
  }
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App history={history} />
  </ThemeProvider>,
  document.getElementById('root')
);
