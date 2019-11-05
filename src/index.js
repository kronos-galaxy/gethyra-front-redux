import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import registerServiceWorker from './registerServiceWorker';

import './assets/style/main.scss';
import App from './containers';
import createAppStore from './store';

import GetApi from './api';
import apiModel from './api/apiModel';

const api = GetApi(process.env.REACT_APP_API_URL, apiModel);

const { store, persistor } = createAppStore();

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <App api={api} />
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();

window.__GETHYRA_API__ = api; // eslint-disable-line
