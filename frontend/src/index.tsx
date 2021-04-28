import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createHashHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router';
import App from './Component/App';
import reportWebVitals from './reportWebVitals';
import configureStore from './Store';
import './index.css';

const history = createHashHistory();
const store = configureStore(
  history,
  `${process.env.REACT_APP_API_HOST}${process.env.REACT_APP_API_PATH}` || window.location.host,
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();
