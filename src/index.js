import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css';
import registerServiceWorker from './registerServiceWorker';
import store from './store';
import App from './App';

axios.defaults.baseURL = '/api/v1';

const GirderApp = () => (
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);

ReactDOM.render(
  <GirderApp />,
  document.getElementById('root'));

registerServiceWorker();

export default GirderApp;
